import Resume from "../models/Resume.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { uploadResumeImage } from "../services/resumeService.js";

// controller for creating a new resume
// POST: /api/resumes/create
export const createResume = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const { title } = req.body;

    // create new resume
    const newResume = await Resume.create({ userId, title })
    // return success message
    return res.status(201).json({ message: 'Resume created successfully', resume: newResume })
});

// controller for deleting a resume
// DELETE: /api/resumes/delete
export const deleteResume = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId })

    // return success message
    return res.status(200).json({ message: 'Resume deleted successfully' })
});


// get user resume by id
// GET: /api/resumes/get
export const getResumeById = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId })

    if (!resume) {
        res.status(404);
        throw new Error("Resume not found");
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume })
});

// get resume by id public
// GET: /api/resumes/public
export const getPublicResumeById = asyncHandler(async (req, res) => {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ public: true, _id: resumeId })

    if (!resume) {
        res.status(404);
        throw new Error("Resume not found");
    }

    return res.status(200).json({ resume })
});

// controller for updating a resume
// PUT: /api/resumes/update
export const updateResume = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body
    const image = req.file;

    let resumeDataCopy;
    if (typeof resumeData === 'string') {
        resumeDataCopy = await JSON.parse(resumeData)
    } else {
        resumeDataCopy = structuredClone(resumeData)
    }

    if (image) {
        resumeDataCopy.personal_info.image = await uploadResumeImage(image.path, removeBackground);
    }

    const resume = await Resume.findByIdAndUpdate({ userId, _id: resumeId }, resumeDataCopy, { new: true })

    return res.status(200).json({ message: 'Saved successfully', resume })
});