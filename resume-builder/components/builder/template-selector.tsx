"use client";

import { useResumeStore } from "@/store/resume-store";
import { TEMPLATES, COLOR_PRESETS, FONT_OPTIONS } from "@/lib/templates";
import { type TemplateId } from "@/types/resume";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function TemplateSelector() {
  const template = useResumeStore((s) => s.data.template);
  const templateSettings = useResumeStore((s) => s.data.templateSettings);
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const updateTemplateSettings = useResumeStore(
    (s) => s.updateTemplateSettings,
  );

  return (
    <div className="space-y-6">
      {/* Template Picker */}
      <div>
        <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">
          Template
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id as TemplateId)}
              className={cn(
                "rounded-lg border-2 p-2 text-center text-xs transition-all",
                template === t.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 hover:border-slate-300",
              )}
            >
              <div
                className="h-12 rounded mb-1.5 flex items-end justify-center pb-1"
                style={{ backgroundColor: `${t.primaryColor}20` }}
              >
                <div
                  className="h-1.5 w-8 rounded-full"
                  style={{ backgroundColor: t.primaryColor }}
                />
              </div>
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Color Presets */}
      <div>
        <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">
          Color
        </Label>
        <div className="flex flex-wrap gap-2">
          {COLOR_PRESETS.map((c) => (
            <button
              key={c.label}
              onClick={() =>
                updateTemplateSettings({
                  primaryColor: c.primary,
                  secondaryColor: c.secondary,
                })
              }
              title={c.label}
              className={cn(
                "h-7 w-7 rounded-full border-2 transition-transform hover:scale-110",
                templateSettings.primaryColor === c.primary
                  ? "border-slate-900 scale-110"
                  : "border-transparent",
              )}
              style={{ backgroundColor: c.primary }}
            />
          ))}
        </div>
      </div>

      {/* Font */}
      <div>
        <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">
          Font
        </Label>
        <Select
          value={templateSettings.fontFamily}
          onValueChange={(v) => updateTemplateSettings({ fontFamily: v })}
        >
          <SelectTrigger className="h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_OPTIONS.map((f) => (
              <SelectItem key={f.value} value={f.value} className="text-sm">
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Spacing */}
      <div>
        <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">
          Spacing
        </Label>
        <div className="flex gap-2">
          {(["compact", "normal", "relaxed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => updateTemplateSettings({ spacing: s })}
              className={cn(
                "flex-1 py-1.5 rounded border text-xs capitalize transition-colors",
                templateSettings.spacing === s
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-slate-200 hover:border-slate-300",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
