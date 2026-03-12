"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Experience } from "@/types/resume";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Loader2,
} from "lucide-react";

async function aiImprove(
  content: string,
): Promise<{ result: string | null; error: string | null }> {
  try {
    const res = await fetch("/api/ai/enhance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section: "experience", content }),
    });
    const data = await res.json();
    if (!res.ok)
      return { result: null, error: data.error ?? "AI request failed" };
    return { result: data.enhanced ?? null, error: null };
  } catch {
    return { result: null, error: "Network error. Please try again." };
  }
}

function ExperienceItem({ exp }: { exp: Experience }) {
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);
  const [open, setOpen] = useState(true);
  const [loadingDesc, setLoadingDesc] = useState(false);
  const [loadingBullet, setLoadingBullet] = useState<number | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [pendingDesc, setPendingDesc] = useState<string | null>(null);
  const [pendingBullet, setPendingBullet] = useState<{
    index: number;
    text: string;
  } | null>(null);

  const update = (field: keyof Experience, value: unknown) => {
    updateExperience(exp.id, { [field]: value });
  };

  const updateBullet = (index: number, value: string) => {
    const bullets = [...exp.bullets];
    bullets[index] = value;
    update("bullets", bullets);
  };

  const addBullet = () => update("bullets", [...exp.bullets, ""]);
  const removeBullet = (i: number) =>
    update(
      "bullets",
      exp.bullets.filter((_, idx) => idx !== i),
    );

  const handleImproveDesc = async () => {
    if (!exp.description.trim()) return;
    setAiError(null);
    setPendingDesc(null);
    setLoadingDesc(true);
    const { result, error } = await aiImprove(exp.description);
    if (result) setPendingDesc(result);
    else if (error) setAiError(error);
    setLoadingDesc(false);
  };

  const handleImproveBullet = async (i: number) => {
    if (!exp.bullets[i].trim()) return;
    setAiError(null);
    setPendingBullet(null);
    setLoadingBullet(i);
    const { result, error } = await aiImprove(exp.bullets[i]);
    if (result) setPendingBullet({ index: i, text: result });
    else if (error) setAiError(error);
    setLoadingBullet(null);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
      <div
        className="flex items-center justify-between px-3 py-2 bg-gray-50 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-medium truncate">
          {exp.position || exp.company || "New Experience"}
        </span>
        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => removeExperience(exp.id)}
          >
            <Trash2 className="h-3.5 w-3.5 text-destructive" />
          </Button>
          {open ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </div>
      {open && (
        <div className="p-3 space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Job Title *</Label>
              <Input
                value={exp.position}
                onChange={(e) => update("position", e.target.value)}
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Company *</Label>
              <Input
                value={exp.company}
                onChange={(e) => update("company", e.target.value)}
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Start Date</Label>
              <Input
                value={exp.startDate}
                onChange={(e) => update("startDate", e.target.value)}
                placeholder="Jan 2022"
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">End Date</Label>
              <Input
                value={exp.current ? "Present" : exp.endDate}
                onChange={(e) => update("endDate", e.target.value)}
                disabled={exp.current}
                placeholder="Dec 2023"
                className="h-7 text-xs"
              />
              <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => update("current", e.target.checked)}
                />
                Currently working
              </label>
            </div>
            <div className="space-y-1 col-span-2">
              <Label className="text-xs">Location</Label>
              <Input
                value={exp.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="New York, NY"
                className="h-7 text-xs"
              />
            </div>
          </div>

          {/* AI error message */}
          {aiError && (
            <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 border border-red-200 rounded-md px-2.5 py-1.5">
              <span>⚠ {aiError}</span>
              <button
                onClick={() => setAiError(null)}
                className="ml-auto text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          )}

          {/* Description with AI improve */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Description</Label>
              <button
                type="button"
                disabled={!exp.description.trim() || loadingDesc}
                onClick={handleImproveDesc}
                className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loadingDesc ? (
                  <Loader2 className="h-2.5 w-2.5 animate-spin" />
                ) : (
                  <Sparkles className="h-2.5 w-2.5" />
                )}
                {loadingDesc ? "Improving…" : "AI Improve"}
              </button>
            </div>
            {pendingDesc && (
              <div className="rounded-lg border border-orange-200 bg-orange-50/60 p-2.5 space-y-2">
                <p className="text-[10px] font-semibold text-orange-700 flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5" />
                  AI preview — review before applying
                </p>
                <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {pendingDesc}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      update("description", pendingDesc);
                      setPendingDesc(null);
                    }}
                    className="flex-1 rounded-md bg-orange-500 px-2 py-1 text-[10px] font-semibold text-white hover:bg-orange-600 transition-colors"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingDesc(null)}
                    className="flex-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Discard
                  </button>
                </div>
              </div>
            )}
            <Textarea
              value={exp.description}
              onChange={(e) => update("description", e.target.value)}
              className="text-xs min-h-[60px] resize-none"
              placeholder="Brief description..."
            />
          </div>

          {/* Bullet points with AI improve per bullet */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-xs">Bullet Points</Label>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs"
                onClick={addBullet}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
            {exp.bullets.map((bullet, i) => (
              <div key={i} className="space-y-1">
                <div className="flex gap-1 items-center">
                  <Input
                    value={bullet}
                    onChange={(e) => updateBullet(i, e.target.value)}
                    className="h-7 text-xs"
                    placeholder="Bullet point..."
                  />
                  <button
                    type="button"
                    disabled={!bullet.trim() || loadingBullet === i}
                    onClick={() => handleImproveBullet(i)}
                    title="AI Improve"
                    className="shrink-0 flex items-center justify-center h-7 w-7 rounded-md border border-orange-200 bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loadingBullet === i ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Sparkles className="h-3 w-3" />
                    )}
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0"
                    onClick={() => removeBullet(i)}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
                {pendingBullet?.index === i && (
                  <div className="rounded-lg border border-orange-200 bg-orange-50/60 p-2 space-y-1.5">
                    <p className="text-[10px] font-semibold text-orange-700 flex items-center gap-1">
                      <Sparkles className="h-2.5 w-2.5" />
                      AI preview — review before applying
                    </p>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {pendingBullet.text}
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          updateBullet(pendingBullet.index, pendingBullet.text);
                          setPendingBullet(null);
                        }}
                        className="flex-1 rounded-md bg-orange-500 px-2 py-1 text-[10px] font-semibold text-white hover:bg-orange-600 transition-colors"
                      >
                        Apply
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingBullet(null)}
                        className="flex-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        Discard
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ExperienceForm() {
  const experience = useResumeStore((s) => s.data.experience);
  const addExperience = useResumeStore((s) => s.addExperience);

  return (
    <div className="pb-2">
      {experience.map((exp) => (
        <ExperienceItem key={exp.id} exp={exp} />
      ))}
      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs"
        onClick={addExperience}
      >
        <Plus className="h-3.5 w-3.5 mr-1.5" />
        Add Experience
      </Button>
    </div>
  );
}
