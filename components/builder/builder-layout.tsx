"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useResumeStore } from "@/store/resume-store";
import { useAutoSave } from "@/hooks/use-auto-save";
import { useResume } from "@/hooks/use-resume";
import { type ResumeData } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditorPanel } from "@/components/builder/editor-panel";
import { PreviewPanel } from "@/components/builder/preview-panel";
import { FileText, Save, Download, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

interface BuilderLayoutProps {
  resumeId: string | null;
  initialTitle: string;
  initialData: ResumeData;
}

export function BuilderLayout({
  resumeId,
  initialTitle,
  initialData,
}: BuilderLayoutProps) {
  const title = useResumeStore((s) => s.title);
  const isDirty = useResumeStore((s) => s.isDirty);
  const lastSaved = useResumeStore((s) => s.lastSaved);
  const isSaving = useResumeStore((s) => s.isSaving);
  const setTitle = useResumeStore((s) => s.setTitle);
  const setResumeId = useResumeStore((s) => s.setResumeId);
  const setData = useResumeStore((s) => s.setData);
  const setIsDirty = useResumeStore((s) => s.setIsDirty);
  const { saveResume } = useResume();
  useAutoSave();

  useEffect(() => {
    // Load server data without marking dirty — prevents spurious auto-save on open
    setResumeId(resumeId);
    setTitle(initialTitle);
    setData(initialData);
    setIsDirty(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    await saveResume();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Toolbar */}
      <header className="bg-white border-b border-gray-200 shadow-sm h-14 flex items-center px-4 gap-3 shrink-0">
        {/* Back */}
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Dashboard
        </Link>

        {/* Divider */}
        <div className="h-5 w-px bg-gray-200" />

        {/* Brand */}
        <div className="flex items-center gap-1.5 font-bold text-sm">
          <div className="h-6 w-6 rounded-md bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <FileText className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-gray-900">ResumeForge</span>
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-gray-200" />

        {/* Title + save status */}
        <div className="flex-1 flex items-center gap-2.5">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="max-w-xs h-8 text-sm bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus-visible:ring-orange-500/20 focus-visible:border-orange-400 transition-colors"
          />
          {isDirty && (
            <span className="text-xs text-orange-500 font-medium animate-pulse">
              Unsaved changes
            </span>
          )}
          {lastSaved && !isDirty && (
            <span className="text-xs text-gray-400">
              Saved {format(lastSaved, "h:mm a")}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={isSaving || !isDirty}
            className="h-8 text-xs border-gray-300 text-gray-500 bg-transparent hover:bg-gray-50 hover:border-gray-400 hover:text-gray-700 disabled:opacity-30 transition-all"
          >
            <Save className="h-3.5 w-3.5 mr-1.5" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button
            size="sm"
            onClick={() => window.print()}
            className="btn-shimmer h-8 text-xs bg-orange-500 hover:bg-orange-400 text-white border-0 shadow-lg shadow-orange-500/30 transition-colors"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export PDF
          </Button>
        </div>
      </header>

      {/* Editor + Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor sidebar — keep white for usability with form inputs */}
        <div className="w-[430px] shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
          <EditorPanel />
        </div>
        {/* Preview canvas — dark bg makes resume pop like Figma/Canva */}
        <div className="flex-1 overflow-y-auto bg-gray-100 flex items-start justify-center p-8">
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
}
