"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Project } from "@/types/resume";
import { Plus, Trash2, ChevronDown, ChevronUp, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function ProjectItem({ project }: { project: Project }) {
  const updateProject = useResumeStore((s) => s.updateProject);
  const removeProject = useResumeStore((s) => s.removeProject);
  const [open, setOpen] = useState(true);
  const [techInput, setTechInput] = useState("");

  const update = (field: keyof Project, value: unknown) =>
    updateProject(project.id, { [field]: value });

  const addTech = () => {
    const t = techInput.trim();
    if (!t) return;
    update("technologies", [...project.technologies, t]);
    setTechInput("");
  };

  const removeTech = (i: number) =>
    update(
      "technologies",
      project.technologies.filter((_, idx) => idx !== i),
    );

  return (
    <div className="border rounded-lg overflow-hidden mb-3">
      <div
        className="flex items-center justify-between px-3 py-2 bg-slate-50 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-medium truncate">
          {project.name || "New Project"}
        </span>
        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => removeProject(project.id)}
          >
            <Trash2 className="h-3.5 w-3.5 text-destructive" />
          </Button>
          {open ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </div>
      {open && (
        <div className="p-3 space-y-2 text-sm">
          <div className="space-y-1">
            <Label className="text-xs">Project Name *</Label>
            <Input
              value={project.name}
              onChange={(e) => update("name", e.target.value)}
              className="h-7 text-xs"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Description</Label>
            <Textarea
              value={project.description}
              onChange={(e) => update("description", e.target.value)}
              className="text-xs min-h-[60px] resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">URL</Label>
              <Input
                value={project.url ?? ""}
                onChange={(e) => update("url", e.target.value)}
                placeholder="https://"
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">GitHub</Label>
              <Input
                value={project.github ?? ""}
                onChange={(e) => update("github", e.target.value)}
                placeholder="github.com/..."
                className="h-7 text-xs"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Technologies</Label>
            <div className="flex gap-1">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTech();
                  }
                }}
                placeholder="React, TypeScript..."
                className="h-7 text-xs"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 shrink-0"
                onClick={addTech}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.technologies.map((t, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="text-xs gap-1 pr-1"
                >
                  {t}
                  <button onClick={() => removeTech(i)}>
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProjectsForm() {
  const projects = useResumeStore((s) => s.data.projects);
  const addProject = useResumeStore((s) => s.addProject);

  return (
    <div className="pb-2">
      {projects.map((p) => (
        <ProjectItem key={p.id} project={p} />
      ))}
      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs"
        onClick={addProject}
      >
        <Plus className="h-3.5 w-3.5 mr-1.5" />
        Add Project
      </Button>
    </div>
  );
}
