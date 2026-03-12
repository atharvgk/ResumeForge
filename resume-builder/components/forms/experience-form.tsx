"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Experience } from "@/types/resume";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

function ExperienceItem({ exp }: { exp: Experience }) {
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);
  const [open, setOpen] = useState(true);

  const update = (field: keyof Experience, value: unknown) => {
    updateExperience(exp.id, { [field]: value });
  };

  const updateBullet = (index: number, value: string) => {
    const bullets = [...exp.bullets];
    bullets[index] = value;
    update("bullets", bullets);
  };

  const addBullet = () => update("bullets", [...exp.bullets, ""]);
  const removeBullet = (i: number) =>
    update(
      "bullets",
      exp.bullets.filter((_, idx) => idx !== i),
    );

  return (
    <div className="border rounded-lg overflow-hidden mb-3">
      <div
        className="flex items-center justify-between px-3 py-2 bg-slate-50 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-medium truncate">
          {exp.position || exp.company || "New Experience"}
        </span>
        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => removeExperience(exp.id)}
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
            <div className="space-y-1">
              <Label className="text-xs">Job Title *</Label>
              <Input
                value={exp.position}
                onChange={(e) => update("position", e.target.value)}
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Company *</Label>
              <Input
                value={exp.company}
                onChange={(e) => update("company", e.target.value)}
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Start Date</Label>
              <Input
                value={exp.startDate}
                onChange={(e) => update("startDate", e.target.value)}
                placeholder="Jan 2022"
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">End Date</Label>
              <Input
                value={exp.current ? "Present" : exp.endDate}
                onChange={(e) => update("endDate", e.target.value)}
                disabled={exp.current}
                placeholder="Dec 2023"
                className="h-7 text-xs"
              />
              <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => update("current", e.target.checked)}
                />
                Currently working
              </label>
            </div>
            <div className="space-y-1 col-span-2">
              <Label className="text-xs">Location</Label>
              <Input
                value={exp.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="New York, NY"
                className="h-7 text-xs"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Description</Label>
            <Textarea
              value={exp.description}
              onChange={(e) => update("description", e.target.value)}
              className="text-xs min-h-[60px] resize-none"
              placeholder="Brief description..."
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Bullet Points</Label>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs"
                onClick={addBullet}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
            {exp.bullets.map((bullet, i) => (
              <div key={i} className="flex gap-1">
                <Input
                  value={bullet}
                  onChange={(e) => updateBullet(i, e.target.value)}
                  className="h-7 text-xs"
                  placeholder="Bullet point..."
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={() => removeBullet(i)}
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ExperienceForm() {
  const experience = useResumeStore((s) => s.data.experience);
  const addExperience = useResumeStore((s) => s.addExperience);

  return (
    <div className="pb-2">
      {experience.map((exp) => (
        <ExperienceItem key={exp.id} exp={exp} />
      ))}
      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs"
        onClick={addExperience}
      >
        <Plus className="h-3.5 w-3.5 mr-1.5" />
        Add Experience
      </Button>
    </div>
  );
}
