"use client";

import { useResumeStore } from "@/store/resume-store";
import { type SectionOrder } from "@/types/resume";
import { Eye, EyeOff, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionReorder() {
  const sectionOrder = useResumeStore((s) => s.data.sectionOrder);
  const toggleSectionVisibility = useResumeStore(
    (s) => s.toggleSectionVisibility,
  );

  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-500 mb-3">
        Toggle sections on/off. Drag to reorder (coming soon).
      </p>
      {sectionOrder.map((section: SectionOrder) => (
        <div
          key={section.id}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg border text-sm",
            section.visible ? "bg-white" : "bg-slate-50 opacity-60",
          )}
        >
          <GripVertical className="h-4 w-4 text-slate-300 cursor-grab" />
          <span className="flex-1 font-medium">{section.label}</span>
          <button
            onClick={() => toggleSectionVisibility(section.id)}
            className="text-slate-400 hover:text-slate-700 transition-colors"
          >
            {section.visible ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
