"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

export function SkillsForm() {
  const skills = useResumeStore((s) => s.data.skills);
  const addSkill = useResumeStore((s) => s.addSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);
  const updateSkill = useResumeStore((s) => s.updateSkill);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const name = input.trim();
    if (!name) return;
    addSkill(name);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="pb-2 space-y-3">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill (e.g. React)"
          className="h-8 text-sm"
        />
        <Button size="sm" className="h-8 shrink-0" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge
            key={skill.id}
            variant="secondary"
            className="gap-1 pr-1 text-sm"
          >
            {skill.name}
            <button
              onClick={() => removeSkill(skill.id)}
              className="rounded-full hover:bg-slate-300 p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {skills.length === 0 && (
          <p className="text-xs text-slate-400">
            No skills added yet. Type and press Enter.
          </p>
        )}
      </div>
    </div>
  );
}
