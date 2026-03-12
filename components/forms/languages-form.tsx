"use client";

import { useResumeStore } from "@/store/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Language } from "@/types/resume";
import { Plus, Trash2 } from "lucide-react";

const PROFICIENCY_OPTIONS: { value: Language["proficiency"]; label: string }[] =
  [
    { value: "basic", label: "Basic" },
    { value: "conversational", label: "Conversational" },
    { value: "professional", label: "Professional" },
    { value: "native", label: "Native / Bilingual" },
  ];

export function LanguagesForm() {
  const languages = useResumeStore((s) => s.data.languages);
  const addLanguage = useResumeStore((s) => s.addLanguage);
  const updateLanguage = useResumeStore((s) => s.updateLanguage);
  const removeLanguage = useResumeStore((s) => s.removeLanguage);

  return (
    <div className="pb-2 space-y-2">
      {languages.map((lang) => (
        <div key={lang.id} className="flex gap-2 items-end">
          <div className="space-y-1 flex-1">
            <Label className="text-xs">Language</Label>
            <Input
              value={lang.name}
              onChange={(e) =>
                updateLanguage(lang.id, { name: e.target.value })
              }
              placeholder="English"
              className="h-7 text-xs"
            />
          </div>
          <div className="space-y-1 flex-1">
            <Label className="text-xs">Proficiency</Label>
            <Select
              value={lang.proficiency}
              onValueChange={(v) =>
                updateLanguage(lang.id, {
                  proficiency: v as Language["proficiency"],
                })
              }
            >
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROFICIENCY_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value} className="text-xs">
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0"
            onClick={() => removeLanguage(lang.id)}
          >
            <Trash2 className="h-3.5 w-3.5 text-destructive" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs"
        onClick={addLanguage}
      >
        <Plus className="h-3.5 w-3.5 mr-1.5" />
        Add Language
      </Button>
    </div>
  );
}
