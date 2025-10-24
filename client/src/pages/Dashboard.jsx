import React, { useEffect } from 'react'
import { FilePenIcon, Trash, PencilIcon, X as XIcon, UploadCloudIcon, Plus, UploadCloud } from 'lucide-react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const [allResumes, setAllResumes] = React.useState([])
  const [showCreateResume, setShowCreateResume] = React.useState(false)
  const [showUploadResume, setShowUploadResume] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [resume, setResume] = React.useState(null)
  const [editResumeId, setEditResumeId] = React.useState('')
  const [deleteConfirmId, setDeleteConfirmId] = React.useState(null)

  const navigate = useNavigate();


  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData)
  }

  const createResume = async (event) => {
    event.preventDefault()
    setShowCreateResume(false)
    navigate('/app/builder/res123')
  }

  const uploadResume = async (event) => {
    event.preventDefault()
    setShowUploadResume(false)
    navigate('/app/builder/res123')
  }

  const editTitle = async (event) => {
    event.preventDefault()
    const updatedResumes = allResumes.map(resume => 
      resume._id === editResumeId ? { ...resume, title } : resume
    )
    setAllResumes(updatedResumes)
    setEditResumeId('')
    setTitle('')
  }

  const deleteResume = (resumeId) => {
    setDeleteConfirmId(resumeId)
  }

  const confirmDelete = () => {
    setAllResumes(allResumes.filter(r => r._id !== deleteConfirmId))
    setDeleteConfirmId(null)
  }

  useEffect(() => {
    loadAllResumes()
  },[])

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome, Joe Doe</p>
        <div className='flex gap-4'>
          <button  onClick={ () => setShowCreateResume(true) } className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:shadow-lg transition-all duration-300 cursor-pointer' style={{ '--hover-color': 'var(--textdark)' }}>
            <Plus className='size-11 transition-all duration-300 p-2.5 text-white rounded-full' style={{ backgroundColor: 'var(--textdark)' }}/>
            <p className='text-sm transition-all duration-300' style={{ color: 'var(--textdark)' }} onMouseEnter={(e) => e.target.style.color = 'var(--textlight)'} onMouseLeave={(e) => e.target.style.color = 'var(--textdark)'}>Create Resume</p>
          </button>
          <button onClick={() => setShowUploadResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:shadow-lg transition-all duration-300 cursor-pointer' style={{ '--hover-color': 'var(--textdark)' }}>
            <UploadCloud className='size-11 transition-all duration-300 p-2.5 text-white rounded-full' style={{ backgroundColor: 'var(--textdark)' }}/>
            <p className='text-sm transition-all duration-300' style={{ color: 'var(--textdark)' }} onMouseEnter={(e) => e.target.style.color = 'var(--textlight)'} onMouseLeave={(e) => e.target.style.color = 'var(--textdark)'}>Upload existing Resume</p>
          </button>
        </div>

        <hr className='my-10' />

        <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button 
                key={index} 
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer'
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + '40'
                }}
              >
                <div onClick ={(e) => e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden gap-1'>
                  <PencilIcon onClick={()=> {setEditResumeId(resume._id); setTitle(resume.title)}} className='size-7 p-1.5 hover:bg-blue-100 hover:text-blue-600 rounded text-slate-700 transition-colors cursor-pointer'/>
                  <Trash onClick={() => deleteResume(resume._id)} className='size-7 p-1.5 hover:bg-red-100 hover:text-red-600 rounded text-slate-700 transition-colors cursor-pointer'/>
                </div>
                <FilePenIcon className='size-7 group-hover:scale-105 transition-all' style={{ color: baseColor }}/>
                <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{ color: baseColor }}>{resume?.title}</p>
                <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center'>
                  Updated on {new Date(resume?.updatedAt).toLocaleDateString()}
                </p>
              </button>
            )
          })}
        </div>

        {showCreateResume && (
          <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={(e) => e.stopPropagation()} className='bg-white rounded-2xl p-8 w-full max-w-md shadow-lg'>
              <h2 className='text-2xl font-medium mb-6' style={{ color: 'var(--textdark)' }}>Create a Resume</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 border-2 rounded focus:outline-none transition-colors' style={{ borderColor: 'var(--textdark)', focusBorderColor: 'var(--textlight)' }} required/>
              <button className='w-full py-2 text-white rounded font-medium hover:opacity-90 transition-opacity' style={{ backgroundColor: 'var(--textdark)' }}>Create Resume</button>
            </div>
          </form>
        )}
        {showUploadResume && (
          <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={(e) => e.stopPropagation()} className='bg-white rounded-2xl p-8 w-full max-w-md shadow-lg'>
              <h2 className='text-2xl font-medium mb-6' style={{ color: 'var(--textdark)' }}>Upload a Resume</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 border-2 rounded focus:outline-none transition-colors' style={{ borderColor: 'var(--textdark)' }} required/>
              <div>
                <label htmlFor='resume-input' className='block text-sm font-medium mb-3' style={{ color: 'var(--textdark)' }}>
                  Select resume file
                </label>
                <div className='flex flex-col items-center justify-center gap-2 border group border-dashed rounded-md p-4 py-10 my-4 cursor-pointer transition-colors' style={{ borderColor: 'var(--textdark)' }}>
                  {resume ? (
                    <p className='font-medium' style={{ color: 'var(--textdark)' }}>✓ {resume.name}</p>
                  ) : (
                    <>
                      <UploadCloudIcon className='size-14 stroke-1' style={{ color: 'var(--textdark)' }} />
                      <p style={{ color: 'var(--textdark)' }}>Click to select PDF</p>
                    </>
                  )}
                </div>
                <input id='resume-input' type='file' className='hidden' accept='.pdf' onChange={(e) => setResume(e.target.files[0])} /> 
              </div>
              <button className='w-full py-2 text-white rounded font-medium hover:opacity-90 transition-opacity' style={{ backgroundColor: 'var(--textdark)' }}>Upload Resume</button>
            </div>
          </form>
        )}

        {editResumeId && (
          <div onClick={() => setEditResumeId('')} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <form onSubmit={editTitle} onClick={(e) => e.stopPropagation()} className='bg-white rounded-2xl p-8 w-full max-w-md shadow-lg'>
              <h2 className='text-2xl font-medium mb-6' style={{ color: 'var(--textdark)' }}>Edit Resume Title</h2>
              <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 border-2 rounded focus:outline-none transition-colors' style={{ borderColor: 'var(--textdark)' }} required/>
              <div className='flex gap-3'>
                <button type='button' onClick={() => {setEditResumeId(''); setTitle('')}} className='flex-1 py-2 border-2 rounded font-medium transition-colors' style={{ borderColor: 'var(--textdark)', color: 'var(--textdark)' }}>Cancel</button>
                <button type='submit' className='flex-1 py-2 text-white rounded font-medium hover:opacity-90 transition-opacity' style={{ backgroundColor: 'var(--textdark)' }}>Update</button>
              </div>
            </form>
          </div>
        )}

        {deleteConfirmId && (
          <div onClick={() => setDeleteConfirmId(null)} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={(e) => e.stopPropagation()} className='bg-white rounded-2xl p-8 w-full max-w-md shadow-lg'>
              <h2 className='text-2xl font-medium mb-4' style={{ color: 'var(--textdark)' }}>Delete Resume?</h2>
              <p className='text-gray-600 mb-6'>Are you sure you want to delete this resume? This action cannot be undone.</p>
              <div className='flex gap-3'>
                <button onClick={() => setDeleteConfirmId(null)} className='flex-1 py-2 border-2 rounded font-medium transition-colors' style={{ borderColor: 'var(--textdark)', color: 'var(--textdark)' }}>Cancel</button>
                <button onClick={confirmDelete} className='flex-1 py-2 text-white rounded font-medium hover:opacity-90 transition-opacity' style={{ backgroundColor: 'var(--textdark)' }}>Delete</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard