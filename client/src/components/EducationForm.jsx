import { GraduationCap, Plus, Trash2, ChevronUp, ChevronDown, GripVertical, Pencil, Check, AlertCircle } from 'lucide-react';
import React, { useState } from 'react'

const EducationForm = ({ data, onChange }) => {
    const [expandedIndex, setExpandedIndex] = useState(data.length > 0 ? 0 : null)
    const [itemToDelete, setItemToDelete] = useState(null)

    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: ""
        };
        const updated = [...data, newEducation];
        onChange(updated);
        setExpandedIndex(updated.length - 1);
    }

    const confirmDelete = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
        setItemToDelete(null);
        if (expandedIndex === index) setExpandedIndex(null);
        else if (expandedIndex > index) setExpandedIndex(expandedIndex - 1);
    }

    const updateEducation = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    const moveEducation = (e, index, direction) => {
        e.stopPropagation();
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === data.length - 1) return;

        const updated = [...data];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
        onChange(updated);
        
        if (expandedIndex === index) setExpandedIndex(targetIndex);
        else if (expandedIndex === targetIndex) setExpandedIndex(index);
    }

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    }

    return (
        <div className="relative space-y-6">
            {/* Custom Delete Confirmation Modal */}
            {itemToDelete !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="size-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle className="size-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Education?</h3>
                            <p className="text-gray-500 mb-6">
                                This will remove <span className="font-semibold text-gray-700">"{data[itemToDelete]?.degree || "this degree"}"</span> from <span className="font-semibold text-gray-700">{data[itemToDelete]?.institution || "this institution"}</span>.
                            </p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setItemToDelete(null)}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => confirmDelete(itemToDelete)}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-95"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-xl font-bold text-gray-900'>Education</h3>
                    <p className='text-sm text-gray-500'>Add your academic background</p>
                </div>
                <button
                    onClick={addEducation}
                    className='group flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95'
                    style={{ backgroundColor: 'var(--textdark)', color: 'white' }}
                >
                    <Plus className="size-4 group-hover:rotate-90 transition-transform" />
                    <span>Add Degree</span>
                </button>
            </div>

            <div className='space-y-3'>
                {data.map((education, index) => {
                    const isExpanded = expandedIndex === index;
                    return (
                        <div
                            key={index}
                            className={`group border rounded-xl overflow-hidden transition-all duration-300 shadow-sm ${
                                isExpanded 
                                ? "border-[var(--textdark)] bg-white ring-1 ring-[var(--textdark)]/10" 
                                : "border-gray-200 bg-gray-50/50 hover:bg-white hover:border-gray-300"
                            }`}
                        >
                            {/* Card Header */}
                            <div 
                                onClick={() => toggleExpand(index)}
                                className={`flex items-center p-3 cursor-pointer ${isExpanded ? "bg-gray-50/80 border-b border-gray-100" : ""}`}
                            >
                                <div className="flex-shrink-0 mr-3 text-gray-400 group-hover:text-gray-600 transition-colors">
                                    <GripVertical className="size-5" />
                                </div>
                                
                                <div className="flex-grow min-w-0">
                                    <h4 className={`font-bold truncate text-sm sm:text-base ${isExpanded ? "text-[var(--textdark)]" : "text-gray-700"}`}>
                                        {education.degree || `Unnamed Degree #${index + 1}`}
                                    </h4>
                                    {!isExpanded && education.institution && (
                                        <p className="text-xs text-gray-400 truncate">{education.institution}</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-1 sm:gap-2 ml-2">
                                    {/* Order Buttons */}
                                    <div className="flex bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-inner">
                                        <button
                                            onClick={(e) => moveEducation(e, index, 'up')}
                                            disabled={index === 0}
                                            className="p-1.5 hover:bg-blue-50 text-blue-600 disabled:opacity-20 transition-all active:scale-90"
                                            title="Move Up"
                                        >
                                            <ChevronUp className="size-4" strokeWidth={3} />
                                        </button>
                                        <div className="w-[1px] bg-gray-200" />
                                        <button
                                            onClick={(e) => moveEducation(e, index, 'down')}
                                            disabled={index === data.length - 1}
                                            className="p-1.5 hover:bg-orange-50 text-orange-600 disabled:opacity-20 transition-all active:scale-90"
                                            title="Move Down"
                                        >
                                            <ChevronDown className="size-4" strokeWidth={3} />
                                        </button>
                                    </div>

                                    {/* Action Buttons */}
                                    <button 
                                        className={`p-1.5 rounded-lg transition-all ${isExpanded ? "bg-green-100 text-green-600" : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"}`}
                                    >
                                        {isExpanded ? <Check className="size-4" /> : <Pencil className="size-4" />}
                                    </button>
                                    
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setItemToDelete(index); }}
                                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className={`transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                                <div className="p-4 space-y-4 bg-white">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Institution Name</label>
                                            <input 
                                                value={education.institution || ""} 
                                                onChange={(e) => updateEducation(index, "institution", e.target.value)} 
                                                type="text" 
                                                placeholder="e.g. Stanford University" 
                                                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[var(--textdark)] focus:ring-4 focus:ring-[var(--textdark)]/5 outline-none transition-all duration-300"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Degree</label>
                                            <input 
                                                value={education.degree || ""} 
                                                onChange={(e) => updateEducation(index, "degree", e.target.value)} 
                                                type="text" 
                                                placeholder="e.g. Bachelor of Science" 
                                                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[var(--textdark)] focus:ring-4 focus:ring-[var(--textdark)]/5 outline-none transition-all duration-300"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Field of Study</label>
                                            <input 
                                                value={education.field || ""} 
                                                onChange={(e) => updateEducation(index, "field", e.target.value)} 
                                                type="text" 
                                                placeholder="e.g. Computer Science" 
                                                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[var(--textdark)] focus:ring-4 focus:ring-[var(--textdark)]/5 outline-none transition-all duration-300"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Graduation Date</label>
                                            <input 
                                                value={education.graduation_date || ""} 
                                                onChange={(e) => updateEducation(index, "graduation_date", e.target.value)} 
                                                type="month" 
                                                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[var(--textdark)] focus:ring-4 focus:ring-[var(--textdark)]/5 outline-none transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">GPA (Optional)</label>
                                        <input 
                                            value={education.gpa || ""} 
                                            onChange={(e) => updateEducation(index, "gpa", e.target.value)} 
                                            type="text" 
                                            placeholder="e.g. 3.8/4.0" 
                                            className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-[var(--textdark)] focus:ring-4 focus:ring-[var(--textdark)]/5 outline-none transition-all duration-300 shadow-sm transition-all"
                                        />
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <button 
                                            onClick={() => setExpandedIndex(null)}
                                            className="px-4 py-2 text-xs font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm active:scale-95"
                                        >
                                            Save & Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {data.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
                    <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm mb-3 text-gray-300">
                        <GraduationCap className="size-6" />
                    </div>
                    <p className="text-gray-500 font-medium font-sans">No education added yet.</p>
                    <button onClick={addEducation} className="mt-2 text-[var(--textdark)] text-sm font-bold hover:underline">Add your first degree</button>
                </div>
            )}
        </div>
    )
}

export default EducationForm

