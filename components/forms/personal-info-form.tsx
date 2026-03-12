"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResumeStore } from "@/store/resume-store";
import {
  personalInfoSchema,
  type PersonalInfoFormValues,
} from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2 } from "lucide-react";

export function PersonalInfoForm() {
  const personalInfo = useResumeStore((s) => s.data.personalInfo);
  const updatePersonalInfo = useResumeStore((s) => s.updatePersonalInfo);
  const resumeData = useResumeStore((s) => s.data);

  const [loadingSummary, setLoadingSummary] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [pendingSummary, setPendingSummary] = useState<string | null>(null);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
  });

  useEffect(() => {
    const subscription = watch((values) => {
      updatePersonalInfo(values as PersonalInfoFormValues);
    });
    return () => subscription.unsubscribe();
  }, [watch, updatePersonalInfo]);

  const hasEnoughData =
    (resumeData.skills?.length ?? 0) > 0 &&
    (resumeData.projects?.length ?? 0) > 0;

  async function handleGenerateSummary() {
    setLoadingSummary(true);
    setAiError(null);
    try {
      const res = await fetch("/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resumeData.personalInfo?.fullName ?? "",
          experiences: (resumeData.experience ?? []).map((e: import('@/types/resume').Experience) => ({
            position: e.position,
            company: e.company,
            bullets: e.bullets,
          })),
          skills: (resumeData.skills ?? []).map((s) => s.name),
          projects: (resumeData.projects ?? []).map((p) => ({
            name: p.name,
            description: p.description,
            technologies: p.technologies,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAiError(data.error ?? "AI request failed");
      } else if (data.summary) {
        setPendingSummary(data.summary);
      }
    } catch {
      setAiError("Network error. Please try again.");
    } finally {
      setLoadingSummary(false);
    }
  }

  return (
    <div className="space-y-3 pb-2">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1 col-span-2">
          <Label className="text-xs">Full Name *</Label>
          <Input
            {...register("fullName")}
            placeholder="John Doe"
            className="h-8 text-sm"
          />
          {errors.fullName && (
            <p className="text-xs text-destructive">
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Email *</Label>
          <Input
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            className="h-8 text-sm"
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Phone</Label>
          <Input
            {...register("phone")}
            placeholder="+1 555 000 0000"
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1 col-span-2">
          <Label className="text-xs">Location</Label>
          <Input
            {...register("location")}
            placeholder="New York, NY"
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Website</Label>
          <Input
            {...register("website")}
            placeholder="https://yoursite.com"
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">LinkedIn</Label>
          <Input
            {...register("linkedin")}
            placeholder="linkedin.com/in/you"
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">GitHub</Label>
          <Input
            {...register("github")}
            placeholder="github.com/you"
            className="h-8 text-sm"
          />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Professional Summary</Label>
          <button
            type="button"
            onClick={handleGenerateSummary}
            disabled={!hasEnoughData || loadingSummary}
            title={
              !hasEnoughData
                ? "Add at least 1 skill and 1 project to generate a summary"
                : "Generate summary from your resume"
            }
            className="flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[11px] font-medium text-orange-600 transition-colors hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loadingSummary ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Sparkles className="h-3 w-3" />
            )}
            {loadingSummary ? "Generating…" : "AI Generate"}
          </button>
        </div>
        {aiError && (
          <div className="flex items-center justify-between rounded-md bg-red-50 px-2 py-1 text-xs text-red-600">
            <span>{aiError}</span>
            <button
              type="button"
              onClick={() => setAiError(null)}
              className="ml-2 font-bold hover:text-red-800"
            >
              ✕
            </button>
          </div>
        )}
        {pendingSummary && (
          <div className="rounded-lg border border-orange-200 bg-orange-50/60 p-3 space-y-2">
            <p className="text-[11px] font-semibold text-orange-700 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI-generated preview — review before applying
            </p>
            <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
              {pendingSummary}
            </p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setValue("summary", pendingSummary);
                  updatePersonalInfo({ summary: pendingSummary });
                  setPendingSummary(null);
                }}
                className="flex-1 rounded-md bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-600 transition-colors"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={() => setPendingSummary(null)}
                className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Discard
              </button>
            </div>
          </div>
        )}
        <Textarea
          {...register("summary")}
          placeholder="A brief summary of your professional background..."
          className="text-sm min-h-[80px] resize-none"
        />
      </div>
    </div>
  );
}
