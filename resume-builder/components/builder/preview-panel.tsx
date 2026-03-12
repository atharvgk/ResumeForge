"use client";

import { useResumeStore } from "@/store/resume-store";
import { ClassicTemplate } from "@/components/templates/classic-template";
import { ModernTemplate } from "@/components/templates/modern-template";
import { MinimalTemplate } from "@/components/templates/minimal-template";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function PreviewPanel() {
  const data = useResumeStore((s) => s.data);
  const title = useResumeStore((s) => s.title);

  const handleDownloadPDF = () => {
    window.print();
  };

  const TemplateComponent =
    data.template === "modern"
      ? ModernTemplate
      : data.template === "minimal"
        ? MinimalTemplate
        : ClassicTemplate;

  return (
    <div className="w-full max-w-[800px]">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-500 font-medium">Preview</span>
        <Button size="sm" variant="outline" onClick={handleDownloadPDF}>
          <Download className="h-4 w-4 mr-1.5" />
          Download PDF
        </Button>
      </div>

      {/* Visible preview */}
      <div
        id="resume-preview"
        className="bg-white shadow-lg rounded-sm overflow-hidden"
        style={{ minHeight: "1056px" }}
      >
        <TemplateComponent data={data} />
      </div>

    </div>
  );
}
