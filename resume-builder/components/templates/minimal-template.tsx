import { type ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
}

export function MinimalTemplate({ data }: TemplateProps) {
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
      style={{
        padding: "48px 56px",
        fontSize: 13,
        fontFamily: "inherit",
        color: "#1a1a1a",
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm" style={{ color: "#666" }}>
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" />
              {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="h-3.5 w-3.5" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1.5">
              <Github className="h-3.5 w-3.5" />
              {personalInfo.github}
            </span>
          )}
        </div>
      </div>

      {personalInfo.summary && (
        <div className="mb-7">
          <p style={{ color: "#444", lineHeight: 1.7 }}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {visibleSections.includes("experience") && experience.length > 0 && (
        <Section title="Experience">
          {experience.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-baseline">
                <div>
                  <strong style={{ color: primaryColor }}>
                    {exp.position}
                  </strong>
                  {exp.company && (
                    <span style={{ color: "#666" }}> — {exp.company}</span>
                  )}
                </div>
                <span style={{ color: "#999", fontSize: 12 }}>
                  {exp.startDate}
                  {exp.startDate && (exp.endDate || exp.current) ? " – " : ""}
                  {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              {exp.description && (
                <p className="mt-1" style={{ color: "#555" }}>
                  {exp.description}
                </p>
              )}
              {exp.bullets.length > 0 && (
                <ul className="mt-1 ml-4 space-y-0.5">
                  {exp.bullets.map(
                    (b, i) =>
                      b && (
                        <li
                          key={i}
                          className="list-disc"
                          style={{ color: "#555" }}
                        >
                          {b}
                        </li>
                      ),
                  )}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {visibleSections.includes("education") && education.length > 0 && (
        <Section title="Education">
          {education.map((edu) => (
            <div key={edu.id} className="mb-3 flex justify-between">
              <div>
                <strong>
                  {edu.degree}
                  {edu.field ? ` in ${edu.field}` : ""}
                </strong>
                {edu.institution && (
                  <span style={{ color: "#666" }}> · {edu.institution}</span>
                )}
                {edu.gpa && (
                  <span style={{ color: "#999", fontSize: 12 }}>
                    {" "}
                    · GPA: {edu.gpa}
                  </span>
                )}
              </div>
              <span style={{ color: "#999", fontSize: 12 }}>
                {edu.startDate} – {edu.current ? "Present" : edu.endDate}
              </span>
            </div>
          ))}
        </Section>
      )}

      {visibleSections.includes("skills") && skills.length > 0 && (
        <Section title="Skills">
          <p style={{ color: "#555" }}>
            {skills.map((s) => s.name).join("  ·  ")}
          </p>
        </Section>
      )}

      {visibleSections.includes("projects") && projects.length > 0 && (
        <Section title="Projects">
          {projects.map((p) => (
            <div key={p.id} className="mb-3">
              <strong>{p.name}</strong>
              {p.description && (
                <p className="mt-0.5" style={{ color: "#555" }}>
                  {p.description}
                </p>
              )}
              {p.technologies.length > 0 && (
                <p style={{ color: "#999", fontSize: 11 }}>
                  {p.technologies.join(", ")}
                </p>
              )}
            </div>
          ))}
        </Section>
      )}

      {visibleSections.includes("certifications") &&
        certifications.length > 0 && (
          <Section title="Certifications">
            {certifications.map((c) => (
              <div key={c.id} className="flex justify-between mb-1.5">
                <span>
                  {c.name} · <span style={{ color: "#666" }}>{c.issuer}</span>
                </span>
                <span style={{ color: "#999", fontSize: 12 }}>{c.date}</span>
              </div>
            ))}
          </Section>
        )}

      {visibleSections.includes("languages") && languages.length > 0 && (
        <Section title="Languages">
          <p style={{ color: "#555" }}>
            {languages.map((l) => `${l.name} (${l.proficiency})`).join("  ·  ")}
          </p>
        </Section>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      <h2
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#999",
          marginBottom: 12,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
