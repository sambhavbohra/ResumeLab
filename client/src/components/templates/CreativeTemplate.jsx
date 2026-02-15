import { Mail, Phone, MapPin, Linkedin, Globe, Github } from "lucide-react";

const CreativeTemplate = ({ data, accentColor }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800 font-sans">
            {/* Header Section */}
            <header className="p-6 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight" style={{ color: accentColor }}>
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 text-xs text-gray-600">
                        {data.personal_info?.email && (
                            <a href={`mailto:${data.personal_info.email}`} className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                                <Mail className="size-3" />
                                <span>{data.personal_info.email}</span>
                            </a>
                        )}
                        {data.personal_info?.phone && (
                            <div className="flex items-center gap-1">
                                <Phone className="size-3" />
                                <span>{data.personal_info.phone}</span>
                            </div>
                        )}
                        {data.personal_info?.location && (
                            <div className="flex items-center gap-1">
                                <MapPin className="size-3" />
                                <span>{data.personal_info.location}</span>
                            </div>
                        )}
                        {data.personal_info?.linkedin && (
                            <a target="_blank" href={data.personal_info.linkedin} className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                                <Linkedin className="size-3" />
                                <span className="break-all">LinkedIn</span>
                            </a>
                        )}
                        {data.personal_info?.website && (
                            <a target="_blank" href={data.personal_info.website} className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                                <Globe className="size-3" />
                                <span className="break-all">Portfolio</span>
                            </a>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-4 h-0.5 rounded-full" style={{ backgroundColor: accentColor }}></div>
            </header>

            <div className="px-6 pb-6">
                {/* Professional Summary */}
                {data.professional_summary && (
                    <section className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                            <span>👋</span>
                            <span style={{ color: accentColor }}>About Me</span>
                        </h2>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {data.professional_summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                            <span>💼</span>
                            <span style={{ color: accentColor }}>Experience</span>
                        </h2>

                        <div className="space-y-4">
                            {data.experience.map((exp, index) => (
                                <div key={index} className="relative">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                                            <span className="text-gray-400">@</span>
                                            <span className="font-medium" style={{ color: accentColor }}>{exp.company}</span>
                                        </div>
                                        <span className="text-xs text-gray-500 whitespace-nowrap bg-gray-100 px-2 py-0.5 rounded">
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    {exp.description && (
                                        <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line pl-1">
                                            {exp.description}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.project && data.project.length > 0 && (
                    <section className="mb-5">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                            <span>🚀</span>
                            <span style={{ color: accentColor }}>Projects</span>
                        </h2>

                        <div className="grid gap-3">
                            {data.project.map((proj, index) => (
                                <div 
                                    key={index} 
                                    className="p-3 rounded-lg border border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                                >
                                    <h3 className="font-semibold text-gray-900 mb-1">{proj.name}</h3>
                                    {proj.description && (
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {proj.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Two Column Layout for Education and Skills */}
                <div className="grid sm:grid-cols-2 gap-5">
                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span>🎓</span>
                                <span style={{ color: accentColor }}>Education</span>
                            </h2>

                            <div className="space-y-3">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="border-l-2 pl-3" style={{ borderColor: accentColor }}>
                                        <h3 className="font-semibold text-gray-900 text-sm">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h3>
                                        <p className="text-gray-600 text-sm">{edu.institution}</p>
                                        <div className="flex gap-3 text-xs text-gray-500 mt-0.5">
                                            <span>{formatDate(edu.graduation_date)}</span>
                                            {edu.gpa && <span>• GPA: {edu.gpa}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <span>⚡</span>
                                <span style={{ color: accentColor }}>Skills</span>
                            </h2>

                            <div className="flex flex-wrap gap-1.5">
                                {data.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 text-xs font-medium rounded-md border"
                                        style={{ 
                                            borderColor: accentColor,
                                            color: accentColor,
                                            backgroundColor: `${accentColor}10`
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;
