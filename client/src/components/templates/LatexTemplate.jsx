import { Mail, Phone, Linkedin, Globe, ExternalLink, Github } from "lucide-react";

const LatexTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-10 bg-white text-[11pt] text-[#141414] font-sans leading-tight">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Fira+Mono&family=Inter:wght@400;700&display=swap');
                .latex-mono { font-family: 'Fira+Mono', monospace; }
                .latex-sans { font-family: 'Inter', sans-serif; }
                .latex-section-title { font-size: 1.15rem; font-weight: 700; color: #141414; }
                .latex-hr { border-top: 2px solid #D4D4D4; margin-bottom: 6px; }
                `}
            </style>

            <div className="latex-sans">
                {/* Header */}
                <header className="text-center mb-6">
                    <h1 className="text-4xl font-bold mb-3">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <div className="flex flex-wrap justify-center items-center gap-2 text-[10pt]">
                        {data.personal_info?.phone && (
                            <>
                                <div className="flex items-center gap-1.5">
                                    <Phone className="size-3" strokeWidth={2.5}/>
                                    <span className="latex-mono">{data.personal_info.phone}</span>
                                </div>
                                <span className="mx-0.5 text-[#D4D4D4]">|</span>
                            </>
                        )}
                        {data.personal_info?.email && (
                            <>
                                <div className="flex items-center gap-1.5">
                                    <Mail className="size-3" strokeWidth={2.5}/>
                                    <span className="latex-mono">{data.personal_info.email}</span>
                                </div>
                                <span className="mx-0.5 text-[#D4D4D4]">|</span>
                            </>
                        )}
                        {data.personal_info?.linkedin && (
                            <>
                                <div className="flex items-center gap-1.5">
                                    <Linkedin className="size-3" strokeWidth={2.5}/>
                                    <a href={data.personal_info.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                                </div>
                                <span className="mx-0.5 text-[#D4D4D4]">|</span>
                            </>
                        )}
                        {data.personal_info?.github && (
                            <>
                                <div className="flex items-center gap-1.5">
                                    <Github className="size-3" strokeWidth={2.5}/>
                                    <a href={data.personal_info.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                                </div>
                                <span className="mx-0.5 text-[#D4D4D4]">|</span>
                            </>
                        )}
                         {data.personal_info?.website && (
                            <div className="flex items-center gap-1.5">
                                <Globe className="size-3" strokeWidth={2.5}/>
                                <a href={data.personal_info.website} target="_blank" rel="noreferrer" className="hover:underline">Website</a>
                            </div>
                        )}
                    </div>
                </header>

                {/* Professional Summary */}
                {data.professional_summary && (
                    <section className="mb-5 text-[10pt]">
                        <h2 className="latex-section-title uppercase tracking-wide">Summary</h2>
                        <div className="latex-hr" />
                        <p className="leading-[1.4] text-justify">{data.professional_summary}</p>
                    </section>
                )}

                {/* Education */}
                {data.education && data.education.length > 0 && (
                    <section className="mb-5">
                        <h2 className="latex-section-title uppercase tracking-wide">Education</h2>
                        <div className="latex-hr" />
                        <div className="space-y-3">
                            {data.education.map((edu, index) => (
                                <div key={index} className="text-[10pt]">
                                    <div className="flex justify-between items-baseline">
                                        <span className="font-bold text-[10.5pt]">{edu.institution}</span>
                                        <span className="text-[9pt] text-[#4D4D4D]">{formatDate(edu.graduation_date)}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline italic">
                                        <span>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</span>
                                        {edu.gpa && <span className="text-[9pt] text-[#4D4D4D]">GPA: {edu.gpa}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section className="mb-5">
                        <h2 className="latex-section-title uppercase tracking-wide">Experience</h2>
                        <div className="latex-hr" />
                        <div className="space-y-4">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="text-[10pt]">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <span className="font-bold text-[10.5pt]">{exp.company}</span>
                                        <span className="text-[9pt] text-[#4D4D4D]">
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <div className="italic mb-1">{exp.position}</div>
                                    <ul className="list-disc list-outside ml-5 space-y-0.5 leading-[1.3]">
                                        {exp.description && exp.description.split('\n').filter(line => line.trim()).map((line, lIdx) => (
                                            <li key={lIdx} className="pl-1">{line.replace(/^[•-]\s*/, '')}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.project && data.project.length > 0 && (
                    <section className="mb-5">
                        <h2 className="latex-section-title uppercase tracking-wide">Projects</h2>
                        <div className="latex-hr" />
                        <div className="space-y-4">
                            {data.project.map((proj, index) => (
                                <div key={index} className="text-[10pt]">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-[10.5pt]">{proj.name}</span>
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">
                                                    <ExternalLink className="size-3" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <ul className="list-disc list-outside ml-5 space-y-0.5 leading-[1.3]">
                                        {proj.description && proj.description.split('\n').filter(line => line.trim()).map((line, lIdx) => (
                                            <li key={lIdx} className="pl-1">{line.replace(/^[•-]\s*/, '')}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills && data.skills.filter(s => (s && typeof s === 'object' && s.category) || (typeof s === 'string' && s.trim())).length > 0 && (
                    <section className="mb-5 text-[10pt]">
                        <h2 className="latex-section-title uppercase tracking-wide">Skills</h2>
                        <div className="latex-hr" />
                        <div className="space-y-1">
                            {data.skills.map((skill, index) => {
                                if (skill && typeof skill === 'object' && skill.category) {
                                    return (
                                        <div key={index} className="flex gap-1.5 leading-[1.4]">
                                            <span className="font-bold flex-shrink-0 min-w-[120px]">{skill.category}:</span>
                                            <span className="text-justify">{(skill.items || []).join(', ')}</span>
                                        </div>
                                    );
                                }
                                
                                const parts = typeof skill === 'string' ? skill.split(':') : [];
                                if (parts.length > 1) {
                                    return (
                                        <div key={index} className="flex gap-1.5 leading-[1.4]">
                                            <span className="font-bold flex-shrink-0 min-w-[120px]">{parts[0].trim()}:</span>
                                            <span className="text-justify">{parts.slice(1).join(':').trim()}</span>
                                        </div>
                                    );
                                }
                                if (typeof skill === 'string' && skill.trim()) {
                                    return (
                                        <div key={index} className="flex items-center gap-1.5">
                                            <span className="latex-mono">•</span>
                                            <span>{skill}</span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default LatexTemplate;
