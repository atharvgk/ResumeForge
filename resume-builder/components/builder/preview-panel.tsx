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

  // Track exact content height so page cards are sized precisely
  const printRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(PAGE_HEIGHT);

  useEffect(() => {
    const el = printRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      // Use getBoundingClientRect for the most accurate rendered height
      const h = el.getBoundingClientRect().height || el.scrollHeight;
      setContentHeight(Math.max(PAGE_HEIGHT, h));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const pageCount = Math.ceil(contentHeight / PAGE_HEIGHT);

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
        Hidden off-screen render — fixed 794px wide (A4 at 96dpi) so
        getBoundingClientRect().height exactly matches the print layout.
        ResizeObserver fires whenever content changes height.
        In @media print this element is repositioned to (0,0) and
        becomes the only visible thing — this is what gets printed.
      */}
      <div id="resume-preview-wrapper" className="relative h-0 overflow-visible">
        <div id="resume-preview" ref={printRef} aria-hidden="true">
          <TemplateComponent data={deferredData} />
        </div>
      </div>

      {/* Visual per-page cards — hidden in print */}
      <div className="space-y-3 print:hidden">
        {Array.from({ length: pageCount }, (_, i) => {
          // The last page is only as tall as the remaining content, not a full blank A4
          const isLastPage = i === pageCount - 1;
          const cardHeight = isLastPage
            ? contentHeight - i * PAGE_HEIGHT
            : PAGE_HEIGHT;

          return (
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
              {/* Clipped to this page's height; inner div slides up to show the right slice */}
              <div
                className="bg-white shadow-lg rounded-sm overflow-hidden"
                style={{ height: `${cardHeight}px` }}
              >
                <div style={{ transform: `translateY(${-i * PAGE_HEIGHT}px)` }}>
                  <TemplateComponent data={deferredData} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
