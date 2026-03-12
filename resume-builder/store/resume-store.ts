import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import {
  type ResumeData,
  type Experience,
  type Education,
  type Skill,
  type Project,
  type Certification,
  type Language,
  type CustomSection,
  type SectionOrder,
  type TemplateId,
  type TemplateSettings,
  DEFAULT_RESUME_DATA,
} from '@/types/resume';

interface ResumeStore {
  // State
  resumeId: string | null;
  title: string;
  data: ResumeData;
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  isPro: boolean;

  // Actions
  setResumeId: (id: string | null) => void;
  setTitle: (title: string) => void;
  setData: (data: ResumeData) => void;
  setDataDirty: (data: ResumeData) => void;
  setIsDirty: (dirty: boolean) => void;
  setIsSaving: (saving: boolean) => void;
  setLastSaved: (date: Date | null) => void;
  setIsPro: (isPro: boolean) => void;
  resetResume: () => void;

  // Personal Info
  updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (items: Experience[]) => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (items: Education[]) => void;

  // Skills
  addSkill: (name: string, category?: string) => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  reorderSkills: (items: Skill[]) => void;

  // Projects
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  reorderProjects: (items: Project[]) => void;

  // Certifications
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  // Languages
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  // Custom Sections
  addCustomSection: (title: string) => void;
  updateCustomSection: (id: string, data: Partial<CustomSection>) => void;
  removeCustomSection: (id: string) => void;

  // Section Order
  updateSectionOrder: (order: SectionOrder[]) => void;
  toggleSectionVisibility: (sectionId: string) => void;

  // Template
  setTemplate: (template: TemplateId) => void;
  updateTemplateSettings: (settings: Partial<TemplateSettings>) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeId: null,
      title: 'Untitled Resume',
      data: DEFAULT_RESUME_DATA,
      isDirty: false,
      isSaving: false,
      lastSaved: null,
      isPro: false,

      setResumeId: (id) => set({ resumeId: id }),
      setTitle: (title) => set({ title, isDirty: true }),
      setData: (data) => set({ data }),
      setDataDirty: (data) => set({ data, isDirty: true }),
      setIsDirty: (isDirty) => set({ isDirty }),
      setIsSaving: (isSaving) => set({ isSaving }),
      setLastSaved: (lastSaved) => set({ lastSaved }),
      setIsPro: (isPro) => set({ isPro }),
      resetResume: () =>
        set({
          resumeId: null,
          title: 'Untitled Resume',
          data: DEFAULT_RESUME_DATA,
          isDirty: false,
          isSaving: false,
          lastSaved: null,
        }),

      updatePersonalInfo: (info) =>
        set((state) => ({
          data: { ...state.data, personalInfo: { ...state.data.personalInfo, ...info } },
          isDirty: true,
        })),

      addExperience: () =>
        set((state) => ({
          data: {
            ...state.data,
            experience: [
              ...state.data.experience,
              {
                id: uuidv4(),
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                bullets: [],
              },
            ],
          },
          isDirty: true,
        })),

      updateExperience: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          },
          isDirty: true,
        })),

      removeExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.filter((e) => e.id !== id),
          },
          isDirty: true,
        })),

      reorderExperience: (items) =>
        set((state) => ({
          data: { ...state.data, experience: items },
          isDirty: true,
        })),

      addEducation: () =>
        set((state) => ({
          data: {
            ...state.data,
            education: [
              ...state.data.education,
              {
                id: uuidv4(),
                institution: '',
                degree: '',
                field: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                gpa: '',
                description: '',
              },
            ],
          },
          isDirty: true,
        })),

      updateEducation: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          },
          isDirty: true,
        })),

      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((e) => e.id !== id),
          },
          isDirty: true,
        })),

      reorderEducation: (items) =>
        set((state) => ({
          data: { ...state.data, education: items },
          isDirty: true,
        })),

      addSkill: (name, category) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: [
              ...state.data.skills,
              { id: uuidv4(), name, category: category ?? '' },
            ],
          },
          isDirty: true,
        })),

      updateSkill: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.map((s) => (s.id === id ? { ...s, ...data } : s)),
          },
          isDirty: true,
        })),

      removeSkill: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((s) => s.id !== id),
          },
          isDirty: true,
        })),

      reorderSkills: (items) =>
        set((state) => ({
          data: { ...state.data, skills: items },
          isDirty: true,
        })),

      addProject: () =>
        set((state) => ({
          data: {
            ...state.data,
            projects: [
              ...state.data.projects,
              {
                id: uuidv4(),
                name: '',
                description: '',
                technologies: [],
                url: '',
                github: '',
                startDate: '',
                endDate: '',
              },
            ],
          },
          isDirty: true,
        })),

      updateProject: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((p) => (p.id === id ? { ...p, ...data } : p)),
          },
          isDirty: true,
        })),

      removeProject: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter((p) => p.id !== id),
          },
          isDirty: true,
        })),

      reorderProjects: (items) =>
        set((state) => ({
          data: { ...state.data, projects: items },
          isDirty: true,
        })),

      addCertification: () =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: [
              ...state.data.certifications,
              {
                id: uuidv4(),
                name: '',
                issuer: '',
                date: '',
                expiryDate: '',
                credentialId: '',
                url: '',
              },
            ],
          },
          isDirty: true,
        })),

      updateCertification: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.map((c) =>
              c.id === id ? { ...c, ...data } : c
            ),
          },
          isDirty: true,
        })),

      removeCertification: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.filter((c) => c.id !== id),
          },
          isDirty: true,
        })),

      addLanguage: () =>
        set((state) => ({
          data: {
            ...state.data,
            languages: [
              ...state.data.languages,
              { id: uuidv4(), name: '', proficiency: 'professional' },
            ],
          },
          isDirty: true,
        })),

      updateLanguage: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.map((l) =>
              l.id === id ? { ...l, ...data } : l
            ),
          },
          isDirty: true,
        })),

      removeLanguage: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.filter((l) => l.id !== id),
          },
          isDirty: true,
        })),

      addCustomSection: (title) =>
        set((state) => ({
          data: {
            ...state.data,
            customSections: [
              ...state.data.customSections,
              { id: uuidv4(), title, items: [] },
            ],
          },
          isDirty: true,
        })),

      updateCustomSection: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            customSections: state.data.customSections.map((s) =>
              s.id === id ? { ...s, ...data } : s
            ),
          },
          isDirty: true,
        })),

      removeCustomSection: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            customSections: state.data.customSections.filter((s) => s.id !== id),
          },
          isDirty: true,
        })),

      updateSectionOrder: (sectionOrder) =>
        set((state) => ({
          data: { ...state.data, sectionOrder },
          isDirty: true,
        })),

      toggleSectionVisibility: (sectionId) =>
        set((state) => ({
          data: {
            ...state.data,
            sectionOrder: state.data.sectionOrder.map((s) =>
              s.id === sectionId ? { ...s, visible: !s.visible } : s
            ),
          },
          isDirty: true,
        })),

      setTemplate: (template) =>
        set((state) => ({
          data: { ...state.data, template },
          isDirty: true,
        })),

      updateTemplateSettings: (settings) =>
        set((state) => ({
          data: {
            ...state.data,
            templateSettings: { ...state.data.templateSettings, ...settings },
          },
          isDirty: true,
        })),
    }),
    {
      name: 'resume-store',
      // Only persist resumeId — data is always loaded fresh from Supabase
      // to avoid showing stale content when opening a different resume
      partialize: (state) => ({
        resumeId: state.resumeId,
        isPro: state.isPro,
      }),
    }
  )
);
