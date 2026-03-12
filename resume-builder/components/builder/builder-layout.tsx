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
import { toast } from "sonner";

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
  const store = useResumeStore();
  const { saveResume } = useResume();
  useAutoSave();

  useEffect(() => {
    store.setResumeId(resumeId);
    store.setTitle(initialTitle);
    store.setData(initialData);
    store.setIsDirty(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    await saveResume();
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      {/* Toolbar */}
      <header className="bg-white border-b h-14 flex items-center px-4 gap-4 shrink-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-slate-600 hover:text-slate-900 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Link>
        <div className="flex items-center gap-2 font-semibold text-sm">
          <FileText className="h-4 w-4 text-blue-600" />
          ResumeForge
        </div>
        <div className="flex-1 flex items-center gap-2">
          <Input
            value={store.title}
            onChange={(e) => store.setTitle(e.target.value)}
            className="max-w-xs h-8 text-sm"
          />
          {store.isDirty && (
            <span className="text-xs text-slate-400">Unsaved changes</span>
          )}
          {store.lastSaved && !store.isDirty && (
            <span className="text-xs text-slate-400">
              Saved {format(store.lastSaved, "h:mm a")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            disabled={store.isSaving || !store.isDirty}
          >
            <Save className="h-4 w-4 mr-1.5" />
            {store.isSaving ? "Saving..." : "Save"}
          </Button>
          <Button
            size="sm"
            onClick={() =>
              toast.info("Use the Download PDF button in the preview panel")
            }
          >
            <Download className="h-4 w-4 mr-1.5" />
            Export PDF
          </Button>
        </div>
      </header>

      {/* Editor + Preview */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[420px] shrink-0 bg-white border-r overflow-y-auto">
          <EditorPanel />
        </div>
        <div className="flex-1 overflow-y-auto bg-slate-200 flex items-start justify-center p-8">
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
}
