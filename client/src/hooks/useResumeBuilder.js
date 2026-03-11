import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../../configs/api';
import toast from 'react-hot-toast';

export const useResumeBuilder = (resumeId) => {
    const { token } = useSelector(state => state.auth);

    const [resumeData, setResumeData] = useState({
        _id: '',
        title: '',
        personal_info: {},
        professional_summary: "",
        experience: [],
        education: [],
        project: [],
        skills: [],
        template: "classic",
        accent_color: "#3B82F6",
        public: false,
    });

    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const [removeBackground, setRemoveBackground] = useState(false);

    const loadExistingResume = async () => {
        try {
            const { data } = await api.get('/api/resumes/get/' + resumeId, { headers: { Authorization: token } });
            if (data.resume) {
                setResumeData(data.resume);
                document.title = data.resume.title;
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (resumeId) {
            loadExistingResume();
        }
    }, [resumeId]);

    const changeResumeVisibility = async () => {
        try {
            const formData = new FormData();
            formData.append("resumeId", resumeId);
            formData.append("resumeData", JSON.stringify({ public: !resumeData.public }));

            const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } });

            setResumeData({ ...resumeData, public: !resumeData.public });
            toast.success(data.message);
        } catch (error) {
            console.error("Error saving resume:", error);
        }
    };

    const saveResume = async () => {
        try {
            let updatedResumeData = structuredClone(resumeData);

            if (typeof resumeData.personal_info.image === 'object') {
                delete updatedResumeData.personal_info.image;
            }

            const formData = new FormData();
            formData.append("resumeId", resumeId);
            formData.append('resumeData', JSON.stringify(updatedResumeData));
            removeBackground && formData.append("removeBackground", "yes");
            typeof resumeData.personal_info.image === 'object' && formData.append("image", resumeData.personal_info.image);

            const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } });

            setResumeData(data.resume);
            toast.success(data.message);
        } catch (error) {
            console.error("Error saving resume:", error);
        }
    };

    return {
        resumeData,
        setResumeData,
        activeSectionIndex,
        setActiveSectionIndex,
        removeBackground,
        setRemoveBackground,
        changeResumeVisibility,
        saveResume
    };
};
