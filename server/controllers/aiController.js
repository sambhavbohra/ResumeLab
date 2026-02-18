import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

// controller for enhancing a resume's professional summary
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if(!userContent){
            return res.status(400).json({message: 'Missing required fields'})
        }

       const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: `You are an expert resume writer with 15+ years of experience in HR and recruitment.

Your task: Transform the user's rough professional summary into a polished, impactful statement.

Guidelines:
- Write 2-3 compelling sentences (50-70 words max)
- Start with a strong professional title and years of experience
- Highlight 2-3 key skills or achievements
- Include measurable results when possible (e.g., "increased sales by 40%")
- Use powerful action words (delivered, spearheaded, optimized, transformed)
- Make it ATS-friendly with relevant industry keywords
- Avoid first-person pronouns (I, me, my)
- Sound confident but not arrogant

Output: Return ONLY the enhanced summary text. No explanations, options, or formatting.` },
                {
                    role: "user",
                    content: userContent,
                },
    ],
        })

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if(!userContent){
            return res.status(400).json({message: 'Missing required fields'})
        }

       const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system",
                 content: `You are an expert resume writer specializing in job descriptions that get interviews.

Your task: Transform the user's job description into powerful, results-driven bullet points.

Guidelines:
- Write 2-3 concise bullet points (one sentence each)
- Start each bullet with a strong action verb (Developed, Led, Implemented, Increased)
- Include quantifiable achievements when possible (%, $, numbers)
- Focus on impact and results, not just responsibilities
- Use industry-specific keywords for ATS optimization
- Keep each bullet under 20 words
- Avoid generic phrases like "responsible for" or "duties included"

Output: Return ONLY the enhanced description text. No bullet symbols, explanations, or formatting.` },
                {
                    role: "user",
                    content: userContent,
                },
    ],
        })

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for uploading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
       
        const {resumeText, title} = req.body;
        const userId = req.userId;

        if(!resumeText){
            return res.status(400).json({message: 'Missing required fields'})
        }

        const systemPrompt = "You are an expert AI Agent to extract data from resume. Extract the information and return it as valid JSON with actual values, not schema definitions."

        const userPrompt = `Extract data from this resume: ${resumeText}
        
        Return a JSON object with the actual extracted values in this exact structure:

        {
            "professional_summary": "extracted summary text here",
            "skills": ["skill1", "skill2", "skill3"],
            "personal_info": {
                "image": "",
                "full_name": "extracted name",
                "profession": "extracted profession/title",
                "email": "extracted email",
                "phone": "extracted phone",
                "location": "extracted location",
                "linkedin": "extracted linkedin url or empty string",
                "website": "extracted website url or empty string"
            },
            "experience": [
                {
                    "company": "company name",
                    "position": "job title",
                    "start_date": "YYYY-MM format",
                    "end_date": "YYYY-MM format or Present",
                    "description": "job description",
                    "is_current": false
                }
            ],
            "projects": [
                {
                    "name": "project name",
                    "type": "project type",
                    "description": "project description"
                }
            ],
            "education": [
                {
                    "institution": "school/university name",
                    "degree": "degree type",
                    "field": "field of study",
                    "graduation_date": "YYYY-MM format",
                    "gpa": "GPA if mentioned or empty string"
                }
            ]
        }

        Important:
        - Return actual extracted values, NOT type definitions
        - Use empty strings "" for missing fields
        - Use empty arrays [] if no items found
        - Ensure valid JSON format
        `;

       const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system",
                 content: systemPrompt },
                {
                    role: "user",
                    content: userPrompt,
                },
        ],
        response_format: {type:  'json_object'}
        })

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData)
        const newResume = await Resume.create({userId, title, ...parsedData})

        res.json({resumeId: newResume._id})
    } catch (error) {
        // Handle validation errors with user-friendly message
        if (error.name === 'ValidationError') {
            return res.status(400).json({message: 'Unable to process resume. Please try uploading again or create a new resume manually.'})
        }
        return res.status(400).json({message: error.message})
    }
}