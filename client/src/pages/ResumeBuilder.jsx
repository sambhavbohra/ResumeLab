import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react'
import html2pdf from 'html2pdf.js'
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
    const element = document.getElementById('resume-preview');
    const name = resumeData?.personal_info?.name || 'Resume';

    const opt = {
      margin: 0,
      filename: `${name.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
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

                <div className='flex items-center gap-2'>
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />
                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                </div>

                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button onClick={() => setActiveSectionIndex((prevIndex) => Math.max(prevIndex - 1, 0))} className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all' disabled={activeSectionIndex === 0}>
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button onClick={handleNext} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`} disabled={activeSectionIndex === sections.length - 1}>
                    Next <ChevronRight className="size-4" />
                  </button>
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
              <button onClick={() => { toast.promise(saveResume, { loading: 'Saving...' }) }} className='bg-gradient-to-br from-[var(--background)] to-[var(--gradientend)] ring-[var(--gradientend)] text-[var(--textdark)] ring hover:ring-[var(--textlight)] transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className='lg:col-span-7 max-lg:mt-6'>
            <div className='relative w-full'>
              <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                {resumeData.public && (
                  <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-[var(--background)] to-[var(--gradientend)] text-[var(--textdark)] rounded-lg ring-[var(--gradientend)] hover:ring transition-colors'>
                    <Share2Icon className='size-4' /> Share
                  </button>
                )}
                <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-[var(--background)] to-[var(--gradientend)] text-[var(--textdark)] ring-[var(--gradientend)] rounded-lg hover:ring transition-colors'>
                  {resumeData.public ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
                  {resumeData.public ? 'Public' : 'Private'}
                </button>
                <button onClick={downloadResume} className='flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-[var(--background)] to-[var(--gradientend)] text-[var(--textdark)] rounded-lg ring-[var(--gradientend)] hover:ring transition-colors'>
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
