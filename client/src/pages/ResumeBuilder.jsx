import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useResumeBuilder } from '../hooks/useResumeBuilder'
import toast from 'react-hot-toast'

const ResumeBuilder = () => {

  const { resumeId } = useParams()

  const {
    resumeData,
    setResumeData,
    activeSectionIndex,
    setActiveSectionIndex,
    removeBackground,
    setRemoveBackground,
    changeResumeVisibility,
    saveResume
  } = useResumeBuilder(resumeId)

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

  // Validation function to check required fields before moving to next section
  const validateCurrentSection = () => {
    const sectionId = sections[activeSectionIndex].id

    switch (sectionId) {
      case 'personal':
        if (!resumeData.personal_info?.full_name?.trim()) {
          toast.error('Please enter your full name')
          return false
        }
        if (!resumeData.personal_info?.email?.trim()) {
          toast.error('Please enter your email address')
          return false
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(resumeData.personal_info.email)) {
          toast.error('Please enter a valid email address')
          return false
        }
        return true

      default:
        return true
    }
  }

  const handleNext = () => {
    if (!validateCurrentSection()) {
      return
    }
    setActiveSectionIndex((prevIndex) => Math.min(prevIndex + 1, sections.length - 1))
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume", })
    } else {
      alert('Share not supported on this browser.')
    }
  }

  const downloadResume = () => {
    try {
      // Get the requested filename (e.g. "Alex_Smith_Resume")
      const name = resumeData?.personal_info?.full_name || 'Resume';
      const fileName = `${name.replace(/\s+/g, '_')}_Resume`;
      
      // Save original title to restore later
      const originalTitle = document.title;
      // The browser uses the document title as the default PDF filename when printing
      document.title = fileName;

      // Trigger the native print dialog (perfectly handles Tailwind v4 oklch colors)
      // The existing @media print CSS in ResumePreview.jsx handles hiding the rest of the UI
      window.print();

      // Restore the original title
      document.title = originalTitle;
      
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to initiate download.');
    }
  }

  return (
    <div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left Panel - Form */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
              {/* progress bar using activeSectionIndex */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr className="absolute top-0 left-0  h-1 bg-gradient-to-r from-[var(--textdark)] to-[var(--textlight)] border-none transition-all duration-2000" style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }} />

              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">

                <div className='flex items-center w-full'>
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />
                  <div className='mx-2 h-6 w-px bg-slate-200'></div>
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                </div>
              </div>

              {/* Form Content */}
              <div className='space-y-6'>
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData(prev => ({ ...prev, personal_info: data }))} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} template={resumeData.template} />
                )}
                {activeSection.id === 'summary' && (
                  <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} setResumeData={setResumeData} />
                )}
                {activeSection.id === 'experience' && (
                  <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
                )}
                {activeSection.id === 'education' && (
                  <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
                )}
                {activeSection.id === 'projects' && (
                  <ProjectForm data={resumeData.project} onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />
                )}
                {activeSection.id === 'skills' && (
                  <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
                )}

              </div>
              <div className='mt-8 pt-6 border-t border-slate-200 flex items-center justify-between'>
                <button onClick={() => { toast.promise(saveResume, { loading: 'Saving...' }) }} className='px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all duration-300 rounded-lg shadow-sm hover:shadow'>
                  Save Changes
                </button>

                <div className='flex items-center gap-3'>
                  {activeSectionIndex !== 0 && (
                    <button onClick={() => setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0))} className='flex items-center gap-1 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-300' disabled={activeSectionIndex === 0}>
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button onClick={handleNext} className={`flex items-center gap-1 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-300 ${activeSectionIndex === sections.length - 1 && 'opacity-50 cursor-not-allowed hidden'}`} disabled={activeSectionIndex === sections.length - 1}>
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className='lg:col-span-7 max-lg:mt-6'>
            <div className='relative w-full mb-4 flex justify-end'>
              <div className='flex items-center gap-3 bg-white/50 p-2 rounded-xl backdrop-blur-sm border border-slate-200/60 shadow-sm'>
                {resumeData.public && (
                  <button onClick={handleShare} className='flex items-center px-4 py-2 gap-2 text-sm font-medium text-[var(--textdark)] bg-[var(--background)]/20 hover:bg-[var(--background)]/40 rounded-lg transition-all duration-300'>
                    <Share2Icon className='size-4' /> Share
                  </button>
                )}
                
                <button 
                  onClick={changeResumeVisibility} 
                  className={`flex items-center px-4 py-2 gap-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    resumeData.public 
                      ? 'text-teal-700 bg-teal-100 hover:bg-teal-200 border border-teal-200' 
                      : 'text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {resumeData.public ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
                  {resumeData.public ? 'Public' : 'Private'}
                </button>

                <button onClick={downloadResume} className='flex items-center px-5 py-2 gap-2 text-sm font-medium text-white bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg'>
                  <DownloadIcon className='size-4' /> Download
                </button>
              </div>
            </div>

            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default ResumeBuilder
