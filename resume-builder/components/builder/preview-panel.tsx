"use client";

import { useRef, useState, useEffect, useDeferredValue } from "react";
import { useResumeStore } from "@/store/resume-store";
import { ClassicTemplate } from "@/components/templates/classic-template";
import { ModernTemplate } from "@/components/templates/modern-template";
import { MinimalTemplate } from "@/components/templates/minimal-template";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// A4 height at 96 dpi (297mm)
const PAGE_HEIGHT = 1122;

export function PreviewPanel() {
  const data = useResumeStore((s) => s.data);
  // Defer expensive template re-render so typing stays snappy
  const deferredData = useDeferredValue(data);

  const previewRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      setPageCount(Math.ceil(el.scrollHeight / PAGE_HEIGHT));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const TemplateComponent =
    deferredData.template === "modern"
      ? ModernTemplate
      : deferredData.template === "minimal"
        ? MinimalTemplate
        : ClassicTemplate;

  return (
    <div className="w-full max-w-[800px]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-500 font-medium">
          Preview{" "}
          {pageCount > 1 && (
            <span className="text-amber-500 ml-1">({pageCount} pages)</span>
          )}
        </span>
        <Button size="sm" variant="outline" onClick={() => window.print()}>
          <Download className="h-4 w-4 mr-1.5" />
          Download PDF
        </Button>
      </div>

      {/* Resume preview with page-break overlay */}
      <div id="resume-preview-wrapper" className="relative">
        <div
          id="resume-preview"
          ref={previewRef}
          className="bg-white shadow-lg rounded-sm"
          style={{ minHeight: `${PAGE_HEIGHT}px` }}
        >
          <TemplateComponent data={deferredData} />
        </div>

        {/* Dashed page-break indicators — hidden during print */}
        {pageCount > 1 &&
          Array.from({ length: pageCount - 1 }, (_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 pointer-events-none print:hidden"
              style={{ top: `${PAGE_HEIGHT * (i + 1)}px` }}
            >
              <div className="border-t-2 border-dashed border-red-400 opacity-70" />
              <span className="absolute right-2 -top-5 text-xs text-red-400 bg-slate-200 px-1.5 py-0.5 rounded">
                Page {i + 2}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
