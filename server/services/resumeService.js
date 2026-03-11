import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from 'fs';

export const uploadResumeImage = async (imagePath, removeBackground) => {
    const imageBufferData = fs.createReadStream(imagePath)

    const response = await imagekit.files.upload({
        file: imageBufferData,
        fileName: 'resume.png',
        folder: 'user-resumes',
        transformation: {
            pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground === 'yes' ? ',e-bgremove' : '')
        }
    });

    return response.url;
};
