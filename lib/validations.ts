import { z } from 'zod';

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20).optional().or(z.literal('')),
  location: z.string().max(100).optional().or(z.literal('')),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
  github: z.string().url('Invalid URL').optional().or(z.literal('')),
  summary: z.string().max(1000).optional().or(z.literal('')),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Company name is required').max(100),
  position: z.string().min(1, 'Position is required').max(100),
  location: z.string().max(100).optional().or(z.literal('')),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().or(z.literal('')),
  current: z.boolean(),
  description: z.string().max(2000).optional().or(z.literal('')),
  bullets: z.array(z.string().max(500)).default([]),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, 'Institution is required').max(150),
  degree: z.string().min(1, 'Degree is required').max(100),
  field: z.string().max(100).optional().or(z.literal('')),
  location: z.string().max(100).optional().or(z.literal('')),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().or(z.literal('')),
  current: z.boolean(),
  gpa: z.string().max(10).optional().or(z.literal('')),
  description: z.string().max(500).optional().or(z.literal('')),
});

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Skill name is required').max(50),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  category: z.string().max(50).optional().or(z.literal('')),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Project name is required').max(100),
  description: z.string().max(1000).optional().or(z.literal('')),
  technologies: z.array(z.string().max(50)).default([]),
  url: z.string().url('Invalid URL').optional().or(z.literal('')),
  github: z.string().url('Invalid URL').optional().or(z.literal('')),
  startDate: z.string().optional().or(z.literal('')),
  endDate: z.string().optional().or(z.literal('')),
});

export const certificationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Certification name is required').max(150),
  issuer: z.string().min(1, 'Issuer is required').max(100),
  date: z.string().min(1, 'Date is required'),
  expiryDate: z.string().optional().or(z.literal('')),
  credentialId: z.string().max(100).optional().or(z.literal('')),
  url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export const languageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Language name is required').max(50),
  proficiency: z.enum(['basic', 'conversational', 'professional', 'native']),
});

export const resumeTitleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
});

export const aiSuggestionSchema = z.object({
  section: z.string().min(1).max(100),
  content: z.string().min(1).max(5000),
  jobDescription: z.string().max(3000).optional(),
});

export const aiEnhanceSchema = z.object({
  section: z.string().min(1).max(100),
  content: z.string().min(1).max(5000),
  jobDescription: z.string().max(3000).optional(),
});

const experienceItemSchema = z.object({
  position: z.string().max(100),
  company: z.string().max(100),
  description: z.string().max(2000).optional().default(''),
  bullets: z.array(z.string().max(500)).max(20).default([]),
});

const projectItemSchema = z.object({
  name: z.string().max(100),
  description: z.string().max(1000).optional().default(''),
  technologies: z.array(z.string().max(50)).max(30).default([]),
});

export const aiSkillsSchema = z.object({
  experiences: z.array(experienceItemSchema).max(20).default([]),
  projects: z.array(projectItemSchema).max(20).default([]),
  existingSkills: z.array(z.string().max(50)).max(100).default([]),
});

export const aiSummarySchema = z.object({
  name: z.string().max(100).optional().default(''),
  experiences: z.array(
    z.object({
      position: z.string().max(100),
      company: z.string().max(100),
      bullets: z.array(z.string().max(500)).max(20).default([]),
    })
  ).max(20).default([]),
  skills: z.array(z.string().max(50)).max(100).default([]),
  projects: z.array(projectItemSchema).max(20).default([]),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
export type ExperienceFormValues = z.infer<typeof experienceSchema>;
export type EducationFormValues = z.infer<typeof educationSchema>;
export type SkillFormValues = z.infer<typeof skillSchema>;
export type ProjectFormValues = z.infer<typeof projectSchema>;
export type CertificationFormValues = z.infer<typeof certificationSchema>;
export type LanguageFormValues = z.infer<typeof languageSchema>;
export type AISkillsInput = z.infer<typeof aiSkillsSchema>;
export type AISummaryInput = z.infer<typeof aiSummarySchema>;
