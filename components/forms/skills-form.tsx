"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Sparkles, Loader2, CheckCircle2 } from "lucide-react";

export function SkillsForm() {
  const skills = useResumeStore((s) => s.data.skills);
  const addSkill = useResumeStore((s) => s.addSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);
  const resumeData = useResumeStore((s) => s.data);

  const [input, setInput] = useState("");
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [addedFromSuggestions, setAddedFromSuggestions] = useState<Set<string>>(
    new Set(),
  );
  const [aiError, setAiError] = useState<string | null>(null);

  const hasEnoughData =
    (resumeData.experience?.length ?? 0) > 0 ||
    (resumeData.projects?.length ?? 0) > 0;

  const handleAdd = () => {
    const name = input.trim();
    if (!name) return;
    addSkill(name);
    setInput("");
    // Remove from suggestions if manually typed
    setSuggestions((prev) =>
      prev.filter((s) => s.toLowerCase() !== name.toLowerCase()),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleAddSuggestion = (name: string) => {
    addSkill(name);
    setAddedFromSuggestions((prev) => new Set(prev).add(name));
    setSuggestions((prev) => prev.filter((s) => s !== name));
  };

  const handleAddAll = () => {
    suggestions.forEach((s) => addSkill(s));
    setAddedFromSuggestions((prev) => {
      const next = new Set(prev);
      suggestions.forEach((s) => next.add(s));
      return next;
    });
    setSuggestions([]);
  };

  async function handleSuggest() {
    setLoadingSuggestions(true);
    setAiError(null);
    setSuggestions([]);
    setAddedFromSuggestions(new Set());
    try {
      const res = await fetch("/api/ai/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experiences: (resumeData.experience ?? []).map((e: import('@/types/resume').Experience) => ({
            position: e.position,
            company: e.company,
            description: e.description,
            bullets: e.bullets,
          })),
          projects: (resumeData.projects ?? []).map((p) => ({
            name: p.name,
            description: p.description,
            technologies: p.technologies,
          })),
          existingSkills: skills.map((s) => s.name),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAiError(data.error ?? "AI request failed");
      } else {
        const newSuggestions = (data.suggestions as string[]).filter(
          (s) =>
            !skills.some((sk) => sk.name.toLowerCase() === s.toLowerCase()),
        );
        if (newSuggestions.length === 0) {
          setAiError(
            "No new skills to suggest — your list already covers everything found in your resume!",
          );
        } else {
          setSuggestions(newSuggestions);
        }
      }
    } catch {
      setAiError("Network error. Please try again.");
    } finally {
      setLoadingSuggestions(false);
    }
  }

  return (
    <div className="pb-2 space-y-3">
      {/* Manual input row */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill (e.g. React)"
          className="h-8 text-sm"
        />
        <Button size="sm" className="h-8 shrink-0" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* AI Suggest button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleSuggest}
          disabled={!hasEnoughData || loadingSuggestions}
          title={
            !hasEnoughData
              ? "Add at least 1 work experience or project to get AI skill suggestions"
              : "Suggest skills based on your projects and experience"
          }
          className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600 transition-colors hover:bg-orange-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loadingSuggestions ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Sparkles className="h-3 w-3" />
          )}
          {loadingSuggestions ? "Analyzing resume…" : "AI Suggest Skills"}
        </button>
        {!hasEnoughData && (
          <span className="text-[11px] text-gray-400">
            Add a project or experience first
          </span>
        )}
      </div>

      {/* Error */}
      {aiError && (
        <div className="flex items-center justify-between rounded-md bg-red-50 px-2 py-1.5 text-xs text-red-600">
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

      {/* AI Suggestions panel */}
      {suggestions.length > 0 && (
        <div className="rounded-lg border border-orange-100 bg-orange-50/50 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-orange-700">
              Suggested skills — click to add
            </p>
            <button
              type="button"
              onClick={handleAddAll}
              className="text-[11px] font-semibold text-orange-600 hover:text-orange-800 underline underline-offset-2"
            >
              Add all ({suggestions.length})
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleAddSuggestion(s)}
                className="flex items-center gap-1 rounded-full border border-orange-200 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:border-orange-400 hover:bg-orange-50 hover:text-orange-700"
              >
                <Plus className="h-3 w-3" />
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Added confirmation */}
      {addedFromSuggestions.size > 0 && suggestions.length === 0 && (
        <div className="flex items-center gap-1.5 text-[11px] text-green-600">
          <CheckCircle2 className="h-3.5 w-3.5" />
          {addedFromSuggestions.size} skill
          {addedFromSuggestions.size > 1 ? "s" : ""} added from AI suggestions
        </div>
      )}

      {/* Current skills */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge
            key={skill.id}
            variant="secondary"
            className="gap-1 pr-1 text-sm"
          >
            {skill.name}
            <button
              onClick={() => removeSkill(skill.id)}
              className="rounded-full hover:bg-gray-300 p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {skills.length === 0 && (
          <p className="text-xs text-gray-400">
            No skills added yet. Type and press Enter.
          </p>
        )}
      </div>
    </div>
  );
}
