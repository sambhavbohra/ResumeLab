import React, { useRef, useEffect, useState } from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'
import CreativeTemplate from './templates/CreativeTemplate'

const ResumePreview = ({data, template, accentColor, classes = ""}) => {
    const resumeRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const calculateScale = () => {
            if (resumeRef.current) {
                // Exact height of a Letter page at 96 DPI
                const targetHeight = 1056; 
                
                // Measurement sandbox: temporarily force standard width and clear transforms to measure true height
                const originalStyle = resumeRef.current.style.cssText;
                resumeRef.current.style.width = '816px'; 
                resumeRef.current.style.transform = 'none';
                resumeRef.current.style.position = 'absolute';
                resumeRef.current.style.visibility = 'hidden';

                // Find the first div (the template container) and force its width to measure accurately
                const templateContainer = resumeRef.current.querySelector('div');
                const originalContainerStyle = templateContainer?.style.cssText;
                if (templateContainer) {
                    templateContainer.style.width = '100%';
                    templateContainer.style.maxWidth = 'none';
                }

                const contentHeight = resumeRef.current.scrollHeight;

                if (contentHeight > targetHeight) {
                    // Calculate scale with a tiny safety margin to prevent ghost page generation
                    const s = (targetHeight / contentHeight) * 0.99;
                    setScale(s);
                } else {
                    setScale(1);
                }

                // Restore original styles so the UI looks normal in the builder
                resumeRef.current.style.cssText = originalStyle;
                if (templateContainer) {
                    templateContainer.style.cssText = originalContainerStyle;
                }
            }
        };

        // Delay ensures heavy layouts, fonts, and images are fully rendered before measuring
        const timer = setTimeout(calculateScale, 500);
        
        window.addEventListener('resize', calculateScale);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculateScale);
        };
    }, [data, template]);

    const renderTemplate = ()=>{
        switch (template) {
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor}/>;
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor}/>;
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accentColor}/>;
            case "creative":
                return <CreativeTemplate data={data} accentColor={accentColor}/>;

            default:
                return <ClassicTemplate data={data} accentColor={accentColor}/>;
        }
    }

  return (
    <div className='w-full bg-gray-100'>
      <div id="resume-print-wrapper" className="print:fixed print:inset-0 print:bg-white print:z-[99999] print:w-[8.5in] print:h-[11in] print:overflow-hidden">
        <div 
            ref={resumeRef}
            id="resume-preview" 
            className={"relative " + classes}
            style={{
                '--print-scale': scale
            }}
        >
            {renderTemplate()}
        </div>
      </div>

      <style>
        {`
        @page {
          size: letter;
          margin: 0;
        }
        @media print {
          html, body {
            width: 8.5in !important;
            height: 11in !important;
            overflow: hidden !important; 
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * {
            visibility: hidden !important;
          }
          #resume-print-wrapper, #resume-print-wrapper * {
            visibility: visible !important;
          }
          #resume-print-wrapper {
            display: block !important;
          }
          #resume-preview {
            /* Expand width inversely so that after scaling down, it fills exactly 8.5in */
            width: calc(8.5in / var(--print-scale, 1)) !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            transform: scale(var(--print-scale, 1)) !important;
            transform-origin: top left !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
          }
          /* Neutralize template-level constraints during print */
          #resume-preview > div {
            max-width: none !important;
            width: 100% !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          /* Ensure specific sections also fill width if they have internal max-widths */
          #resume-preview header, 
          #resume-preview section {
            width: 100% !important;
            max-width: none !important;
          }
        }
        `}
      </style>
    </div>
  )
}

export default ResumePreview

