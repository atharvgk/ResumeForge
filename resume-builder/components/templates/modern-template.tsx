import { type ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import { FONT_MAP, SPACING_MULTIPLIER } from "@/lib/templates";

interface TemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: TemplateProps) {
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
  const fontFamily = FONT_MAP[templateSettings.fontFamily] ?? FONT_MAP.inter;
  const sm = SPACING_MULTIPLIER[templateSettings.spacing] ?? 1;
  const sidePad = Math.round(24 * sm);

  // Sections rendered in the main column (skills/languages live in the sidebar)
  const mainSections = ["experience", "education", "projects", "certifications"];

  const renderMainSection = (id: string) => {
    switch (id) {
      case "experience":
        return experience.length > 0 ? (
          <div key="experience" className="mb-5">
            <SectionHeader title="Experience" color={primaryColor} />
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="mb-4 pl-3 border-l-2"
                style={{ borderColor: `${primaryColor}40` }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-slate-900">{exp.position}</strong>
                    {exp.company && (
                      <span className="text-slate-500 ml-1">{exp.company}</span>
                    )}
                  </div>
                  <span className="text-slate-400 text-xs shrink-0 ml-2">
                    {exp.startDate}
                    {exp.startDate && (exp.endDate || exp.current) ? " – " : ""}
                    {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="mt-1 text-slate-600 text-xs">{exp.description}</p>
                )}
                {exp.bullets.length > 0 && (
                  <ul className="mt-1 ml-3 space-y-0.5">
                    {exp.bullets.map(
                      (b, i) =>
                        b && (
                          <li key={i} className="list-disc text-slate-600 text-xs">{b}</li>
                        ),
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case "education":
        return education.length > 0 ? (
          <div key="education" className="mb-5">
            <SectionHeader title="Education" color={primaryColor} />
            {education.map((edu) => (
              <div
                key={edu.id}
                className="mb-3 pl-3 border-l-2"
                style={{ borderColor: `${primaryColor}40` }}
              >
                <div className="flex justify-between">
                  <strong className="text-slate-900">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                  </strong>
                  <span className="text-slate-400 text-xs">
                    {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                  </span>
                </div>
                {edu.institution && (
                  <div className="text-slate-500 text-xs">{edu.institution}</div>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case "projects":
        return projects.length > 0 ? (
          <div key="projects" className="mb-5">
            <SectionHeader title="Projects" color={primaryColor} />
            {projects.map((p) => (
              <div key={p.id} className="mb-3">
                <strong>{p.name}</strong>
                {p.description && (
                  <p className="mt-0.5 text-slate-600 text-xs">{p.description}</p>
                )}
                {p.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.technologies.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null;

      case "certifications":
        return certifications.length > 0 ? (
          <div key="certifications" className="mb-5">
            <SectionHeader title="Certifications" color={primaryColor} />
            {certifications.map((c) => (
              <div key={c.id} className="mb-2 flex justify-between text-xs">
                <span><strong>{c.name}</strong> · {c.issuer}</span>
                <span className="text-slate-400">{c.date}</span>
              </div>
            ))}
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-full" style={{ fontSize: 13, fontFamily }}>
      {/* Sidebar */}
      <div
        className="w-64 shrink-0 text-white"
        style={{ backgroundColor: primaryColor, padding: `${sidePad}px` }}
      >
        <div className="mb-6">
          <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mb-3">
            {personalInfo.fullName
              ? personalInfo.fullName[0].toUpperCase()
              : "A"}
          </div>
          <h1 className="font-bold text-xl leading-tight">
            {personalInfo.fullName || "Your Name"}
          </h1>
        </div>

        {/* Contact Info */}
        <div className="mb-6 space-y-2 text-sm text-white/80">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="h-3.5 w-3.5 shrink-0" />
              <span className="break-all">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-2">
              <Github className="h-3.5 w-3.5 shrink-0" />
              <span className="break-all">{personalInfo.github}</span>
            </div>
          )}
        </div>

        {/* Skills Sidebar */}
        {visibleSections.includes("skills") && skills.length > 0 && (
          <div className="mb-6">
            <h2 className="font-bold text-xs uppercase tracking-wider mb-3 text-white/60">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s.id}
                  className="bg-white/20 text-white px-2 py-0.5 rounded text-xs"
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages Sidebar */}
        {visibleSections.includes("languages") && languages.length > 0 && (
          <div>
            <h2 className="font-bold text-xs uppercase tracking-wider mb-3 text-white/60">
              Languages
            </h2>
            <div className="space-y-1">
              {languages.map((l) => (
                <div key={l.id} className="text-sm text-white/80">
                  {l.name}{" "}
                  <span className="text-white/50 text-xs">
                    ({l.proficiency})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white" style={{ padding: `${sidePad}px` }}>
        {personalInfo.summary && (
          <div className="mb-5">
            <SectionHeader title="About Me" color={primaryColor} />
            <p className="text-slate-600 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Dynamic main sections — rendered in user-defined order */}
        {sectionOrder
          .filter((s) => s.visible && mainSections.includes(s.id))
          .map((s) => renderMainSection(s.id))}
      </div>
    </div>
  );
}

function SectionHeader({ title, color }: { title: string; color: string }) {
  return (
    <div className="mb-3">
      <h2
        className="font-bold text-sm uppercase tracking-wider"
        style={{ color }}
      >
        {title}
      </h2>
      <div className="h-0.5 mt-1" style={{ backgroundColor: `${color}30` }} />
    </div>
  );
}
