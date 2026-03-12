"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TemplateSelector } from "@/components/builder/template-selector";
import { SectionReorder } from "@/components/builder/section-reorder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Lazy-load form components — only downloaded when their section is first opened
const PersonalInfoForm = dynamic(
  () => import("@/components/forms/personal-info-form").then((m) => ({ default: m.PersonalInfoForm })),
  { ssr: false }
);
const ExperienceForm = dynamic(
  () => import("@/components/forms/experience-form").then((m) => ({ default: m.ExperienceForm })),
  { ssr: false }
);
const EducationForm = dynamic(
  () => import("@/components/forms/education-form").then((m) => ({ default: m.EducationForm })),
  { ssr: false }
);
const SkillsForm = dynamic(
  () => import("@/components/forms/skills-form").then((m) => ({ default: m.SkillsForm })),
  { ssr: false }
);
const ProjectsForm = dynamic(
  () => import("@/components/forms/projects-form").then((m) => ({ default: m.ProjectsForm })),
  { ssr: false }
);
const CertificationsForm = dynamic(
  () => import("@/components/forms/certifications-form").then((m) => ({ default: m.CertificationsForm })),
  { ssr: false }
);
const LanguagesForm = dynamic(
  () => import("@/components/forms/languages-form").then((m) => ({ default: m.LanguagesForm })),
  { ssr: false }
);

export function EditorPanel() {
  // Track which sections have ever been opened so we only mount them once needed
  const [openSections, setOpenSections] = useState<string[]>(["personal"]);
  const [mounted, setMounted] = useState<Set<string>>(new Set(["personal"]));

  const handleValueChange = useCallback((values: string[]) => {
    setOpenSections(values);
    setMounted((prev) => {
      const next = new Set(prev);
      values.forEach((v) => next.add(v));
      return next;
    });
  }, []);

  return (
    <div className="p-4">
      <Tabs defaultValue="content">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="content" className="flex-1">
            Content
          </TabsTrigger>
          <TabsTrigger value="design" className="flex-1">
            Design
          </TabsTrigger>
          <TabsTrigger value="sections" className="flex-1">
            Sections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <Accordion
            type="multiple"
            value={openSections}
            onValueChange={handleValueChange}
            className="space-y-2"
          >
            <AccordionItem value="personal" className="border rounded-lg px-3">
              <AccordionTrigger className="text-sm font-medium">
                Personal Info
              </AccordionTrigger>
              <AccordionContent>
                {mounted.has("personal") && <PersonalInfoForm />}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="experience"
              className="border rounded-lg px-3"
            >
              <AccordionTrigger className="text-sm font-medium">
                Experience
              </AccordionTrigger>
              <AccordionContent>
                {mounted.has("experience") && <ExperienceForm />}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="education" className="border rounded-lg px-3">
              <AccordionTrigger className="text-sm font-medium">
                Education
              </AccordionTrigger>
              <AccordionContent>
                {mounted.has("education") && <EducationForm />}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="skills" className="border rounded-lg px-3">
              <AccordionTrigger className="text-sm font-medium">
                Skills
              </AccordionTrigger>
              <AccordionContent>
                {mounted.has("skills") && <SkillsForm />}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="projects" className="border rounded-lg px-3">
              <AccordionTrigger className="text-sm font-medium">
                Projects
              </AccordionTrigger>
              <AccordionContent>
                {mounted.has("projects") && <ProjectsForm />}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="certifications"
              className="border rounded-lg px-3"
            >
              <AccordionTrigger className="text-sm font-medium">
                Certifications
              </AccordionTrigger>
              <AccordionContent>
                {mounted.has("certifications") && <CertificationsForm />}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="languages" className="border rounded-lg px-3">
              <AccordionTrigger className="text-sm font-medium">
                Languages
              </AccordionTrigger>
              <AccordionContent>
                {mounted.has("languages") && <LanguagesForm />}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="design">
          <TemplateSelector />
        </TabsContent>

        <TabsContent value="sections">
          <SectionReorder />
        </TabsContent>
      </Tabs>
    </div>
  );
}
