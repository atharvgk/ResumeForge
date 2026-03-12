"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { TEMPLATES, COLOR_PRESETS, FONT_OPTIONS } from "@/lib/templates";
import { type TemplateId } from "@/types/resume";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Lock, Crown, Check } from "lucide-react";

export function TemplateSelector() {
  const template = useResumeStore((s) => s.data.template);
  const templateSettings = useResumeStore((s) => s.data.templateSettings);
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const updateTemplateSettings = useResumeStore(
    (s) => s.updateTemplateSettings,
  );
  const isPro = useResumeStore((s) => s.isPro);
  const setIsPro = useResumeStore((s) => s.setIsPro);

  const [upgradeTarget, setUpgradeTarget] = useState<TemplateId | null>(null);

  function handleTemplateClick(id: string, isPaid?: boolean) {
    if (isPaid && !isPro) {
      setUpgradeTarget(id as TemplateId);
    } else {
      setTemplate(id as TemplateId);
    }
  }

  function handleUpgrade() {
    setIsPro(true);
    if (upgradeTarget) setTemplate(upgradeTarget);
    setUpgradeTarget(null);
  }

  return (
    <div className="space-y-6">
      {/* Pro badge */}
      {isPro && (
        <div className="flex items-center gap-1.5 text-xs font-medium text-orange-600 bg-orange-50 border border-orange-200 rounded-md px-2.5 py-1.5">
          <Crown className="h-3.5 w-3.5" />
          Pro Plan Active
        </div>
      )}

      {/* Template Picker */}
      <div>
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
          Template
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {TEMPLATES.map((t) => {
            const locked = t.isPaid && !isPro;
            return (
              <button
                key={t.id}
                onClick={() => handleTemplateClick(t.id, t.isPaid)}
                className={cn(
                  "relative rounded-lg border-2 p-2 text-center text-xs transition-all",
                  template === t.id
                    ? "border-orange-500 bg-orange-50"
                    : locked
                      ? "border-gray-200 hover:border-orange-300 opacity-80"
                      : "border-gray-200 hover:border-gray-300",
                )}
              >
                {/* Badge */}
                {t.isPaid ? (
                  <span className="absolute top-1 right-1 text-[9px] font-bold px-1 rounded bg-orange-100 text-orange-700 leading-4">
                    PRO
                  </span>
                ) : (
                  <span className="absolute top-1 right-1 text-[9px] font-bold px-1 rounded bg-green-100 text-green-700 leading-4">
                    FREE
                  </span>
                )}

                <div
                  className="h-12 rounded mb-1.5 flex items-center justify-center"
                  style={{ backgroundColor: `${t.primaryColor}20` }}
                >
                  {locked ? (
                    <Lock className="h-4 w-4 text-orange-500" />
                  ) : (
                    <div
                      className="h-1.5 w-8 rounded-full"
                      style={{ backgroundColor: t.primaryColor }}
                    />
                  )}
                </div>
                {t.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Upgrade Dialog */}
      <Dialog
        open={upgradeTarget !== null}
        onOpenChange={(open) => !open && setUpgradeTarget(null)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-orange-500" />
              Unlock Pro Templates
            </DialogTitle>
            <DialogDescription>
              Get access to premium templates and future pro features.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div className="text-center">
              <span className="text-3xl font-bold">$9.99</span>
              <span className="text-gray-500 text-sm">/month</span>
            </div>
            <ul className="space-y-1.5 text-sm">
              {[
                "All premium templates",
                "Priority support",
                "Advanced customization",
                "Unlimited exports",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-gray-700">
                  <Check className="h-4 w-4 text-green-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button onClick={handleUpgrade} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Pro (Simulated)
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-gray-500"
              onClick={() => setUpgradeTarget(null)}
            >
              Maybe later
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Color Presets */}
      <div>
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
          Color
        </Label>
        <div className="flex flex-wrap gap-2">
          {COLOR_PRESETS.map((c) => (
            <button
              key={c.label}
              onClick={() =>
                updateTemplateSettings({
                  primaryColor: c.primary,
                  secondaryColor: c.secondary,
                })
              }
              title={c.label}
              className={cn(
                "h-7 w-7 rounded-full border-2 transition-transform hover:scale-110",
                templateSettings.primaryColor === c.primary
                  ? "border-gray-900 scale-110"
                  : "border-transparent",
              )}
              style={{ backgroundColor: c.primary }}
            />
          ))}
        </div>
      </div>

      {/* Font */}
      <div>
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
          Font
        </Label>
        <Select
          value={templateSettings.fontFamily}
          onValueChange={(v) => updateTemplateSettings({ fontFamily: v })}
        >
          <SelectTrigger className="h-8 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_OPTIONS.map((f) => (
              <SelectItem key={f.value} value={f.value} className="text-sm">
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Spacing */}
      <div>
        <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
          Spacing
        </Label>
        <div className="flex gap-2">
          {(["compact", "normal", "relaxed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => updateTemplateSettings({ spacing: s })}
              className={cn(
                "flex-1 py-1.5 rounded border text-xs capitalize transition-colors",
                templateSettings.spacing === s
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-gray-200 hover:border-gray-300",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
