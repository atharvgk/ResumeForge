"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Education } from "@/types/resume";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

function EducationItem({ edu }: { edu: Education }) {
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);
  const [open, setOpen] = useState(true);

  const update = (field: keyof Education, value: unknown) =>
    updateEducation(edu.id, { [field]: value });

  return (
    <div className="border rounded-lg overflow-hidden mb-3">
      <div
        className="flex items-center justify-between px-3 py-2 bg-gray-50 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-medium truncate">
          {edu.institution || edu.degree || "New Education"}
        </span>
        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => removeEducation(edu.id)}
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
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1 col-span-2">
              <Label className="text-xs">Institution *</Label>
              <Input
                value={edu.institution}
                onChange={(e) => update("institution", e.target.value)}
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Degree *</Label>
              <Input
                value={edu.degree}
                onChange={(e) => update("degree", e.target.value)}
                placeholder="Bachelor of Science"
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Field of Study</Label>
              <Input
                value={edu.field}
                onChange={(e) => update("field", e.target.value)}
                placeholder="Computer Science"
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Start Date</Label>
              <Input
                value={edu.startDate}
                onChange={(e) => update("startDate", e.target.value)}
                placeholder="Sep 2018"
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">End Date</Label>
              <Input
                value={edu.current ? "Present" : (edu.endDate ?? "")}
                onChange={(e) => update("endDate", e.target.value)}
                disabled={edu.current}
                placeholder="May 2022"
                className="h-7 text-xs"
              />
              <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={edu.current}
                  onChange={(e) => update("current", e.target.checked)}
                />
                Currently attending
              </label>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">GPA</Label>
              <Input
                value={edu.gpa ?? ""}
                onChange={(e) => update("gpa", e.target.value)}
                placeholder="3.8"
                className="h-7 text-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function EducationForm() {
  const education = useResumeStore((s) => s.data.education);
  const addEducation = useResumeStore((s) => s.addEducation);

  return (
    <div className="pb-2">
      {education.map((edu) => (
        <EducationItem key={edu.id} edu={edu} />
      ))}
      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs"
        onClick={addEducation}
      >
        <Plus className="h-3.5 w-3.5 mr-1.5" />
        Add Education
      </Button>
    </div>
  );
}
