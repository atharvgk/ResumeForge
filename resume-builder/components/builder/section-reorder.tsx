"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { type SectionOrder } from "@/types/resume";
import { Eye, EyeOff, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionReorder() {
  const sectionOrder = useResumeStore((s) => s.data.sectionOrder);
  const toggleSectionVisibility = useResumeStore(
    (s) => s.toggleSectionVisibility,
  );
  const updateSectionOrder = useResumeStore((s) => s.updateSectionOrder);

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, idx: number) => {
    e.dataTransfer.effectAllowed = "move";
    setDragIndex(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setOverIndex(idx);
  };

  const handleDrop = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === idx) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }
    const next = [...sectionOrder];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(idx, 0, moved);
    updateSectionOrder(next);
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500 mb-3">
        Drag rows to reorder sections. Click the eye to show/hide.
      </p>
      {sectionOrder.map((section: SectionOrder, idx: number) => (
        <div
          key={section.id}
          draggable
          onDragStart={(e) => handleDragStart(e, idx)}
          onDragOver={(e) => handleDragOver(e, idx)}
          onDrop={(e) => handleDrop(e, idx)}
          onDragEnd={handleDragEnd}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg border text-sm cursor-grab active:cursor-grabbing transition-all select-none",
            section.visible
              ? "bg-white border-gray-200 hover:border-orange-200 hover:shadow-sm"
              : "bg-gray-50 border-gray-200 opacity-60",
            dragIndex === idx && "opacity-40 scale-95",
            overIndex === idx &&
              dragIndex !== idx &&
              "border-orange-400 bg-orange-50",
          )}
        >
          <GripVertical className="h-4 w-4 text-gray-400 shrink-0" />
          <span className="flex-1 font-medium text-gray-700">
            {section.label}
          </span>
          <button
            onClick={() => toggleSectionVisibility(section.id)}
            className="text-gray-400 hover:text-orange-500 transition-colors"
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
