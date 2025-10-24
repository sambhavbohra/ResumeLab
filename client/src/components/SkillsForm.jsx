import { Plus, Sparkles, X } from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({ data, onChange }) => {
    const [newSkill, setNewSkill] = useState("")

     const addSkill = () => {
        if(newSkill.trim() && !data.includes(newSkill.trim())){
            onChange([...data, newSkill.trim()])
            setNewSkill("")
        }
     }

      const removeSkill = (indexToRemove)=>{
        onChange(data.filter((_, index)=> index !== indexToRemove))
      }

      const handleKeyPress = (e)=>{
        if(e.key === "Enter"){
            e.preventDefault();
            addSkill();
        }
      }
  return (
    <div className='space-y-4'>
      <div>
        <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'> Skills </h3>
        <p className='text-sm text-gray-500'> Add your technical and soft skills </p>
      </div>

      <div className="flex gap-2">
            <input type="text" placeholder="Enter a skill (e.g., JavaScript, Project Management)" className='flex-1 px-3 py-2 text-sm'
            onChange={(e)=>setNewSkill(e.target.value)}
            value={newSkill}
            onKeyDown={handleKeyPress}
            />
      <button onClick={addSkill} disabled={!newSkill.trim} className='flex items-center gap-2 px-4 py-2 text-sm text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed' style={{ backgroundColor: 'var(--textdark)' }}>
                <Plus className="size-4"/> Add
            </button>
      </div>

      {data.length > 0 ? (
        <div className='flex flex-wrap gap-2'>
            {data.map((skill, index)=>(
        <span key={index} className='flex items-center gap-1 px-3 py-1 rounded-full text-sm' style={{ backgroundColor: 'var(--gradientend)', color: 'var(--textdark)' }}>
                    {skill}
          <button onClick={()=> removeSkill(index)} className="ml-1 rounded-full p-0.5 transition-colors" style={{ color: 'var(--textdark)' }}>
                        <X className="w-3 h-3" />
                    </button>
                </span>
            ))}
        </div>
      )
    :
    (
        <div className='text-center py-6 text-gray-500'>
            <Sparkles className="w-10 h-10 mx-auto mb-2 text-gray-300"/>
            <p>No skills added yet.</p>
            <p className="text-sm">Add your technical and soft skills above.</p>
        </div>
    )}

  <div className='p-3 rounded-lg' style={{ backgroundColor: 'var(--gradientend)' }}>
    <p className='text-sm' style={{ color: 'var(--textdark)' }}><strong>Tip:</strong> Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication).</p>
    </div>
    </div>
  )
}

export default SkillsForm
