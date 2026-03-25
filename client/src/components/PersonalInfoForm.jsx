import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User, ImageIcon, Github } from 'lucide-react'
import React from 'react'

// Templates that require a photo
const TEMPLATES_WITH_PHOTO = ['minimal-image']

const PersonalInfoForm = ({data, onChange, removeBackground, setRemoveBackground, template}) => {

    const showPhotoUpload = TEMPLATES_WITH_PHOTO.includes(template)

    const handleChange = (field, value)=>{
        onChange({...data, [field]: value})
    }

    const fields = [
        {key: "full_name", label: "Full Name", icon: User, type: "text", required: true, autoComplete: "name"},
        {key: "email", label: "Email Address", icon: Mail, type: "email", required: true, autoComplete: "email"},
        { key: "phone", label: "Phone Number", icon: Phone, type: "tel", autoComplete: "tel" },
        { key: "location", label: "Location", icon: MapPin, type: "text", autoComplete: "address-level2" },
        { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text", autoComplete: "organization-title" },
        { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url", autoComplete: "url" },
        { key: "github", label: "GitHub Profile", icon: Github, type: "url", autoComplete: "url" },
        { key: "website", label: "Personal Website", icon: Globe, type: "url", autoComplete: "url" }
    ]

  return (
    <div>
      <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
      <p className='text-sm text-gray-600'>Get Started with the personal information</p>
      
      {/* Photo Upload - Only show for templates that need it */}
      {showPhotoUpload ? (
        <div className='flex items-center gap-2'>
          <label>
              {data.image ? (
                  <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="user-image" className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80 cursor-pointer'/>
              ) : (
                  <div className='inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer'>
                      <User className='size-10 p-2.5 border rounded-full'/> 
                      Upload profile photo
                  </div>
              )}
              <input type="file" accept="image/jpeg, image/png" className="hidden" onChange={(e)=>handleChange("image", e.target.files[0])}/>
          </label>
          {typeof data.image === 'object' && (
              <div className='flex flex-col gap-1 pl-4 text-sm'>
                  <p>Remove Background</p>
                  <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                      <input type="checkbox" className="sr-only peer" onChange={()=>setRemoveBackground(prev => !prev)} checked={removeBackground}/>
                      <div className='w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-[var(--textdark)] transition-colors duration-200'>
                      </div>
                      <span className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4'></span>
                  </label>
              </div>
          )}
        </div>
      ) : null}

    {fields.map((field)=>{
        const Icon = field.icon;
        return (
            <div key={field.key} className='space-y-1 mt-5'>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Icon className="size-4"/>
                    {field.label}
                    {field.required && <span style={{ color: 'var(--textdark)' }}>*</span>}
                </label>
                <input type={field.type} value={data[field.key] || ""} onChange={(e)=>handleChange(field.key, e.target.value)} className='mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-[3px] focus:ring-[var(--gradientend)] focus:border-[var(--textdark)] outline-none transition-all duration-300 shadow-sm text-sm bg-white hover:border-slate-400' placeholder={`Enter your ${field.label.toLowerCase()}`} required={field.required} autoComplete={field.autoComplete}/>
            </div>
        )
    })}
    </div>
  )
}

export default PersonalInfoForm
