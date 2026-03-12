"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resume-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Certification } from "@/types/resume";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

function CertificationItem({ cert }: { cert: Certification }) {
  const updateCertification = useResumeStore((s) => s.updateCertification);
  const removeCertification = useResumeStore((s) => s.removeCertification);
  const [open, setOpen] = useState(true);

  const update = (field: keyof Certification, value: string) =>
    updateCertification(cert.id, { [field]: value });

  return (
    <div className="border rounded-lg overflow-hidden mb-3">
      <div
        className="flex items-center justify-between px-3 py-2 bg-slate-50 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-medium truncate">
          {cert.name || "New Certification"}
        </span>
        <div
          className="flex items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => removeCertification(cert.id)}
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
            <div className="space-y-1 col-span-2">
              <Label className="text-xs">Certification Name *</Label>
              <Input
                value={cert.name}
                onChange={(e) => update("name", e.target.value)}
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Issuer *</Label>
              <Input
                value={cert.issuer}
                onChange={(e) => update("issuer", e.target.value)}
                placeholder="AWS, Google..."
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Date</Label>
              <Input
                value={cert.date}
                onChange={(e) => update("date", e.target.value)}
                placeholder="Jan 2023"
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Credential ID</Label>
              <Input
                value={cert.credentialId ?? ""}
                onChange={(e) => update("credentialId", e.target.value)}
                className="h-7 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">URL</Label>
              <Input
                value={cert.url ?? ""}
                onChange={(e) => update("url", e.target.value)}
                placeholder="https://"
                className="h-7 text-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function CertificationsForm() {
  const certifications = useResumeStore((s) => s.data.certifications);
  const addCertification = useResumeStore((s) => s.addCertification);

  return (
    <div className="pb-2">
      {certifications.map((c) => (
        <CertificationItem key={c.id} cert={c} />
      ))}
      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs"
        onClick={addCertification}
      >
        <Plus className="h-3.5 w-3.5 mr-1.5" />
        Add Certification
      </Button>
    </div>
  );
}
