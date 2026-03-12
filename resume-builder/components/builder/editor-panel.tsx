"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PersonalInfoForm } from "@/components/forms/personal-info-form";
import { ExperienceForm } from "@/components/forms/experience-form";
import { EducationForm } from "@/components/forms/education-form";
import { SkillsForm } from "@/components/forms/skills-form";
import { ProjectsForm } from "@/components/forms/projects-form";
import { CertificationsForm } from "@/components/forms/certifications-form";
import { LanguagesForm } from "@/components/forms/languages-form";
import { TemplateSelector } from "@/components/builder/template-selector";
import { SectionReorder } from "@/components/builder/section-reorder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function EditorPanel() {
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
            defaultValue={["personal"]}
            className="space-y-2"
          >
            <AccordionItem value="personal" className="border rounded-lg px-3">
              <AccordionTrigger className="text-sm font-medium">
                Personal Info
              </AccordionTrigger>
              <AccordionContent>
                <PersonalInfoForm />
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
                <ExperienceForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="education" className="border rounded-lg px-3">
              <AccordionTrigger className="text-sm font-medium">
                Education
              </AccordionTrigger>
              <AccordionContent>
                <EducationForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="skills" className="border rounded-lg px-3">
              <AccordionTrigger className="text-sm font-medium">
                Skills
              </AccordionTrigger>
              <AccordionContent>
                <SkillsForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="projects" className="border rounded-lg px-3">
              <AccordionTrigger className="text-sm font-medium">
                Projects
              </AccordionTrigger>
              <AccordionContent>
                <ProjectsForm />
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
                <CertificationsForm />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="languages" className="border rounded-lg px-3">
              <AccordionTrigger className="text-sm font-medium">
                Languages
              </AccordionTrigger>
              <AccordionContent>
                <LanguagesForm />
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
