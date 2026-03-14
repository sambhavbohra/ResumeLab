import { Plus, Trash2, X, LayoutGrid, Tag } from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({ data = [], onChange }) => {
    const [newItem, setNewItem] = useState("")
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(null)
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState("")

    // Ensure data is an array
    const safeData = Array.isArray(data) ? data : []

    const handleAddCategory = () => {
        if (newCategoryName && newCategoryName.trim()) {
            const updated = [...safeData, { category: newCategoryName.trim(), items: [] }]
            onChange(updated)
            setActiveCategoryIndex(updated.length - 1)
            setNewCategoryName("")
            setShowCategoryModal(false)
        }
    }

    const removeCategory = (index) => {
        const updated = safeData.filter((_, i) => i !== index)
        onChange(updated)
        if (activeCategoryIndex === index) setActiveCategoryIndex(null)
    }

    const addItem = (categoryIndex) => {
        if (!newItem.trim()) return
        const updated = [...safeData]
        const category = updated[categoryIndex]
        
        // Ensure category and items exist
        if (category && typeof category === 'object') {
            if (!category.items) category.items = []
            if (!category.items.includes(newItem.trim())) {
                category.items.push(newItem.trim())
                onChange(updated)
            }
        }
        setNewItem("")
    }

    const removeItem = (categoryIndex, itemIndex) => {
        const updated = [...safeData]
        if (updated[categoryIndex]?.items) {
            updated[categoryIndex].items = updated[categoryIndex].items.filter((_, i) => i !== itemIndex)
            onChange(updated)
        }
    }

    const handleKeyPress = (e, index) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addItem(index)
        }
    }

    return (
        <div className='relative space-y-6'>
            {/* Custom Add Category Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="size-10 bg-[var(--gradientend)] rounded-full flex items-center justify-center">
                                    <LayoutGrid className="size-5 text-[var(--textdark)]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Add Category</h3>
                                    <p className="text-xs text-gray-500">e.g. Frontend, Backend, Tools</p>
                                </div>
                            </div>

                            <input
                                autoFocus
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                                placeholder="Enter category name..."
                                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-[var(--textdark)] focus:ring-4 focus:ring-[var(--textdark)]/5 outline-none transition-all"
                            />

                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={() => {
                                        setShowCategoryModal(false)
                                        setNewCategoryName("")
                                    }}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddCategory}
                                    disabled={!newCategoryName.trim()}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--textdark)] text-white font-semibold hover:opacity-90 shadow-lg transition-all active:scale-95 disabled:opacity-30"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-xl font-bold text-gray-900'>Skills</h3>
                    <p className='text-sm text-gray-500'>Group your skills by category for better readability</p>
                </div>
                <button
                    onClick={() => setShowCategoryModal(true)}
                    className='group flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95'
                    style={{ backgroundColor: 'var(--textdark)', color: 'white' }}
                >
                    <Plus className="size-4" />
                    <span>Add Category</span>
                </button>
            </div>

            <div className='space-y-4'>
                {safeData.map((category, catIndex) => {
                    // Handle legacy data (strings) or nulls
                    if (!category || typeof category !== 'object' || !category.category) {
                        return null; // Skip non-categorical data in the form view
                    }

                    return (
                        <div key={catIndex} className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm space-y-4 transition-all hover:border-[var(--textdark)]/30">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-[var(--textdark)]">
                                    <LayoutGrid className="size-4" />
                                    <h4 className="font-bold text-sm uppercase tracking-wider">{category.category}</h4>
                                </div>
                                <button
                                    onClick={() => removeCategory(catIndex)}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                >
                                    <Trash2 className="size-4" />
                                </button>
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder={`Add item to ${category.category}...`}
                                    className='flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[var(--textdark)] focus:ring-4 focus:ring-[var(--textdark)]/5 outline-none transition-all'
                                    value={activeCategoryIndex === catIndex ? newItem : ""}
                                    onChange={(e) => {
                                        setActiveCategoryIndex(catIndex)
                                        setNewItem(e.target.value)
                                    }}
                                    onKeyDown={(e) => handleKeyPress(e, catIndex)}
                                />
                                <button
                                    onClick={() => addItem(catIndex)}
                                    disabled={!newItem.trim() || activeCategoryIndex !== catIndex}
                                    className='px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30'
                                >
                                    <Plus className="size-4" />
                                </button>
                            </div>

                            <div className='flex flex-wrap gap-2'>
                                {(category.items || []).map((item, itemIndex) => (
                                    <span
                                        key={itemIndex}
                                        className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-gray-100 shadow-sm transition-all hover:shadow-md'
                                        style={{ backgroundColor: 'var(--gradientend)', color: 'var(--textdark)' }}
                                    >
                                        <Tag className="size-3 opacity-60" />
                                        {item}
                                        <button
                                            onClick={() => removeItem(catIndex, itemIndex)}
                                            className="ml-1 hover:bg-black/5 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                                {(!category.items || category.items.length === 0) && (
                                    <p className="text-xs text-gray-400 italic py-2">No items added yet</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {safeData.filter(c => c && typeof c === 'object' && c.category).length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
                    <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm mb-3 text-gray-300">
                        <LayoutGrid className="size-8" />
                    </div>
                    <p className="text-gray-500 font-medium">No skill categories yet</p>
                    <p className="text-xs text-gray-400 mb-4">Add categories like Frontend, Backend, etc.</p>
                    <button onClick={() => setShowCategoryModal(true)} className="text-[var(--textdark)] text-sm font-bold hover:underline">Add your first category</button>
                    {safeData.length > 0 && safeData.some(c => typeof c !== 'object') && (
                        <p className="text-[10px] text-gray-400 mt-4">Note: Older skills will be preserved but not shown in this categorical view.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default SkillsForm
