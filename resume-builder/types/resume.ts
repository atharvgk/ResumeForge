export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'conversational' | 'professional' | 'native';
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export type SectionType =
  | 'personalInfo'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'custom';

export interface SectionOrder {
  id: SectionType | string;
  label: string;
  visible: boolean;
}

export type TemplateId = 'classic' | 'modern' | 'minimal';

export interface TemplateSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'normal' | 'relaxed';
  showPhoto: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  customSections: CustomSection[];
  sectionOrder: SectionOrder[];
  template: TemplateId;
  templateSettings: TemplateSettings;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  data: ResumeData;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  slug?: string;
}

export const DEFAULT_TEMPLATE_SETTINGS: TemplateSettings = {
  primaryColor: '#2563eb',
  secondaryColor: '#64748b',
  fontFamily: 'inter',
  fontSize: 'medium',
  spacing: 'normal',
  showPhoto: false,
};

export const DEFAULT_SECTION_ORDER: SectionOrder[] = [
  { id: 'personalInfo', label: 'Personal Info', visible: true },
  { id: 'experience', label: 'Experience', visible: true },
  { id: 'education', label: 'Education', visible: true },
  { id: 'skills', label: 'Skills', visible: true },
  { id: 'projects', label: 'Projects', visible: true },
  { id: 'certifications', label: 'Certifications', visible: true },
  { id: 'languages', label: 'Languages', visible: true },
];

export const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  customSections: [],
  sectionOrder: DEFAULT_SECTION_ORDER,
  template: 'classic',
  templateSettings: DEFAULT_TEMPLATE_SETTINGS,
};
