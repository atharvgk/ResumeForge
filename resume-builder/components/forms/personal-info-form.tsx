"use client";

import { useEffect } from "react";
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

export function PersonalInfoForm() {
  const personalInfo = useResumeStore((s) => s.data.personalInfo);
  const updatePersonalInfo = useResumeStore((s) => s.updatePersonalInfo);

  const {
    register,
    watch,
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
        <Label className="text-xs">Professional Summary</Label>
        <Textarea
          {...register("summary")}
          placeholder="A brief summary of your professional background..."
          className="text-sm min-h-[80px] resize-none"
        />
      </div>
    </div>
  );
}
