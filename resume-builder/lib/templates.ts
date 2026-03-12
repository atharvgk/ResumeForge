import { type TemplateId } from '@/types/resume';

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  preview: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  features: string[];
  isPaid?: boolean;
}

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'A timeless, professional layout trusted by recruiters worldwide.',
    preview: '/templates/classic-preview.png',
    primaryColor: '#1e3a5f',
    secondaryColor: '#2563eb',
    fontFamily: 'Georgia, serif',
    features: ['Traditional layout', 'ATS-friendly', 'Clean typography', 'Professional look'],
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'A sleek, two-column design that stands out in creative industries.',
    preview: '/templates/modern-preview.png',
    primaryColor: '#0f172a',
    secondaryColor: '#6366f1',
    fontFamily: 'Inter, sans-serif',
    isPaid: true,
    features: ['Two-column layout', 'Color accents', 'Skills visualization', 'Modern typography'],
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, minimal design with generous whitespace for easy reading.',
    preview: '/templates/minimal-preview.png',
    primaryColor: '#111827',
    secondaryColor: '#6b7280',
    fontFamily: 'DM Sans, sans-serif',
    features: ['Minimalist design', 'White space focus', 'Easy to scan', 'Subtle styling'],
  },
];

export function getTemplate(id: TemplateId): TemplateConfig {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}

export const FONT_OPTIONS = [
  { value: 'inter', label: 'Inter (Sans-serif)' },
  { value: 'georgia', label: 'Georgia (Serif)' },
  { value: 'dm-sans', label: 'DM Sans (Modern)' },
  { value: 'lato', label: 'Lato (Clean)' },
  { value: 'playfair', label: 'Playfair Display (Elegant)' },
];

/** Maps the stored font key to a CSS font-family string */
export const FONT_MAP: Record<string, string> = {
  inter: 'Inter, ui-sans-serif, system-ui, sans-serif',
  georgia: 'Georgia, "Times New Roman", serif',
  'dm-sans': '"DM Sans", ui-sans-serif, system-ui, sans-serif',
  lato: 'Lato, ui-sans-serif, system-ui, sans-serif',
  playfair: '"Playfair Display", Georgia, serif',
};

/** Multiplier applied to padding/gap values for each spacing option */
export const SPACING_MULTIPLIER: Record<string, number> = {
  compact: 0.7,
  normal: 1.0,
  relaxed: 1.4,
};

export const COLOR_PRESETS = [
  { label: 'Blue', primary: '#2563eb', secondary: '#64748b' },
  { label: 'Slate', primary: '#0f172a', secondary: '#475569' },
  { label: 'Indigo', primary: '#4338ca', secondary: '#6366f1' },
  { label: 'Emerald', primary: '#065f46', secondary: '#10b981' },
  { label: 'Rose', primary: '#9f1239', secondary: '#f43f5e' },
  { label: 'Amber', primary: '#92400e', secondary: '#f59e0b' },
];
