import { type ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
}

export function ClassicTemplate({ data }: TemplateProps) {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    sectionOrder,
    templateSettings,
  } = data;
  const primaryColor = templateSettings.primaryColor;

  const visibleSections = sectionOrder
    .filter((s) => s.visible)
    .map((s) => s.id);

  return (
    <div
      className="font-sans text-slate-800"
      style={{ padding: "40px 48px", fontSize: 13 }}
    >
      {/* Header */}
      <div
        className="text-center mb-6 pb-5 border-b-2"
        style={{ borderColor: primaryColor }}
      >
        <h1 className="font-bold text-3xl mb-1" style={{ color: primaryColor }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-slate-500 text-xs mt-2">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-3 w-3" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github className="h-3 w-3" />
              {personalInfo.github}
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-5">
          <SectionHeader title="Professional Summary" color={primaryColor} />
          <p className="text-slate-600 leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Dynamic Sections */}
      {visibleSections.includes("experience") && experience.length > 0 && (
        <div className="mb-5">
          <SectionHeader title="Experience" color={primaryColor} />
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <strong>{exp.position}</strong>
                  {exp.company && (
                    <span className="text-slate-500"> · {exp.company}</span>
                  )}
                </div>
                <span className="text-slate-400 text-xs">
                  {exp.startDate}
                  {exp.startDate && (exp.endDate || exp.current) ? " – " : ""}
                  {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              {exp.location && (
                <div className="text-slate-400 text-xs">{exp.location}</div>
              )}
              {exp.description && (
                <p className="mt-1 text-slate-600">{exp.description}</p>
              )}
              {exp.bullets.length > 0 && (
                <ul className="mt-1 ml-4 space-y-0.5">
                  {exp.bullets.map(
                    (b, i) =>
                      b && (
                        <li key={i} className="list-disc text-slate-600">
                          {b}
                        </li>
                      ),
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {visibleSections.includes("education") && education.length > 0 && (
        <div className="mb-5">
          <SectionHeader title="Education" color={primaryColor} />
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <strong>
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ""}
                  </strong>
                  {edu.institution && (
                    <span className="text-slate-500"> · {edu.institution}</span>
                  )}
                </div>
                <span className="text-slate-400 text-xs">
                  {edu.startDate}
                  {edu.startDate && (edu.endDate || edu.current) ? " – " : ""}
                  {edu.current ? "Present" : edu.endDate}
                </span>
              </div>
              {edu.gpa && (
                <div className="text-slate-400 text-xs">GPA: {edu.gpa}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {visibleSections.includes("skills") && skills.length > 0 && (
        <div className="mb-5">
          <SectionHeader title="Skills" color={primaryColor} />
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-2 py-0.5 rounded text-xs"
                style={{
                  backgroundColor: `${primaryColor}10`,
                  color: primaryColor,
                  border: `1px solid ${primaryColor}30`,
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {visibleSections.includes("projects") && projects.length > 0 && (
        <div className="mb-5">
          <SectionHeader title="Projects" color={primaryColor} />
          {projects.map((p) => (
            <div key={p.id} className="mb-3">
              <strong>{p.name}</strong>
              {p.url && (
                <span className="text-slate-400 text-xs ml-2">({p.url})</span>
              )}
              {p.description && (
                <p className="mt-0.5 text-slate-600">{p.description}</p>
              )}
              {p.technologies.length > 0 && (
                <div className="text-xs text-slate-400 mt-0.5">
                  Technologies: {p.technologies.join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {visibleSections.includes("certifications") &&
        certifications.length > 0 && (
          <div className="mb-5">
            <SectionHeader title="Certifications" color={primaryColor} />
            {certifications.map((c) => (
              <div key={c.id} className="mb-2 flex justify-between">
                <div>
                  <strong>{c.name}</strong>
                  {c.issuer && (
                    <span className="text-slate-500"> · {c.issuer}</span>
                  )}
                </div>
                <span className="text-slate-400 text-xs">{c.date}</span>
              </div>
            ))}
          </div>
        )}

      {visibleSections.includes("languages") && languages.length > 0 && (
        <div className="mb-5">
          <SectionHeader title="Languages" color={primaryColor} />
          <div className="flex flex-wrap gap-3">
            {languages.map((l) => (
              <span key={l.id} className="text-slate-600">
                {l.name}{" "}
                <span className="text-slate-400 text-xs">
                  ({l.proficiency})
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <h2
        className="font-bold text-sm uppercase tracking-wider"
        style={{ color }}
      >
        {title}
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: `${color}40` }} />
    </div>
  );
}
