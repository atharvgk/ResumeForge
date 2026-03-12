"use client";

import { useRef, useState, useEffect, useDeferredValue } from "react";
import { useResumeStore } from "@/store/resume-store";
import { ClassicTemplate } from "@/components/templates/classic-template";
import { ModernTemplate } from "@/components/templates/modern-template";
import { MinimalTemplate } from "@/components/templates/minimal-template";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// A4 at 96 dpi: 297mm × (96 / 25.4) ≈ 1122 px
const PAGE_HEIGHT = 1122;

export function PreviewPanel() {
  const data = useResumeStore((s) => s.data);
  // Defer expensive template re-renders so typing stays snappy
  const deferredData = useDeferredValue(data);

  // Measure the hidden off-screen render to know how many pages we have
  const printRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const el = printRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      setPageCount(Math.max(1, Math.ceil(el.scrollHeight / PAGE_HEIGHT)));
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
      {/* Toolbar */}
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

      {/*
        Hidden off-screen render:
        - Width is fixed at 794px (A4 at 96dpi) so scrollHeight accurately
          reflects how many print pages the content fills
        - ResizeObserver watches it to update pageCount
        - In @media print the CSS brings it to (0, 0) and makes it the only
          visible element — this is what gets printed
        - The parent wrapper is 0-height so it doesn't shift visible layout
      */}
      <div id="resume-preview-wrapper" className="relative h-0 overflow-visible">
        <div id="resume-preview" ref={printRef} aria-hidden="true">
          <TemplateComponent data={deferredData} />
        </div>
      </div>

      {/* Visual per-page cards — one clipped card per A4 page, hidden in print */}
      <div className="space-y-3 print:hidden">
        {Array.from({ length: pageCount }, (_, i) => (
          <div key={i}>
            {i > 0 && (
              <div className="py-2 flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-300" />
                <span className="text-xs text-slate-400 bg-slate-200 px-2.5 py-1 rounded-full font-medium">
                  Page {i + 1}
                </span>
                <div className="flex-1 h-px bg-slate-300" />
              </div>
            )}
            {/* Clipped to one page height; inner div translated up to show correct page */}
            <div
              className="bg-white shadow-lg rounded-sm overflow-hidden"
              style={{ height: `${PAGE_HEIGHT}px` }}
            >
              <div style={{ transform: `translateY(${-i * PAGE_HEIGHT}px)` }}>
                <TemplateComponent data={deferredData} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
