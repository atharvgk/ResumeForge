# ResumeForge

A full-stack resume builder with AI-powered content suggestions, multiple professional templates, and one-click PDF export.

Live demo: https://resume-forge-cyan-one.vercel.app/

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS v3 + shadcn/ui |
| Auth and Database | Supabase (PostgreSQL + Auth) |
| AI | Groq API - Llama 3.1 8B Instant |
| State Management | Zustand |
| Forms and Validation | React Hook Form + Zod |
| PDF Export | Browser print dialog (window.print with print CSS) |

---

## Setup Instructions

### 1. Clone and install dependencies

```bash
git clone https://github.com/atharvgk/ResumeForge.git
cd ResumeForge
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `GROQ_API_KEY` | Groq API key (get one free at console.groq.com) |

### 3. Set up the database

Open your Supabase project, go to SQL Editor, and run the contents of `database/schema.sql`.

Optionally enable Google OAuth under Supabase > Authentication > Providers.

### 4. Start the development server

```bash
npm run dev
```

Open http://localhost:3000.

---

## Features Implemented

### Resume Creation
- Create a new resume from the dashboard
- Edit all sections: Personal Info, Summary, Experience, Education, Skills, Projects
- Changes auto-save every 3 seconds to Supabase (no data loss)
- Real-time side-by-side preview while editing

### Resume Templates
- **3 templates available**: Classic, Modern, Minimal
- **2 free templates**: Classic and Minimal - available to all users
- **1 paid/locked template**: Modern - locked behind an "Upgrade" prompt (simulated, no real payment required)
- Each template has a different layout, section order, and visual style
- Template preview available before applying in the Design tab

### Resume Download
- Download resume as a pixel-perfect PDF with one click (Export PDF button in the builder)
- Edit anytime and re-export - the latest version is always downloadable

### AI Assistance (Groq - Llama 3.1)
- **Improve Experience Bullets**: Rewrites job description bullets in achievement-first, ATS-optimized language
- **Generate Professional Summary**: Auto-generates a tailored summary based on your name, role, and experience
- **Suggest Skills**: Recommends relevant skills based on your job title and existing experience
- All AI suggestions shown in a review panel before applying - nothing is applied without user confirmation

### Authentication
- Email/password sign up and login
- Google OAuth support
- Protected routes - all resume data is scoped per user

### Data Storage
- All resume data stored in Supabase (PostgreSQL) - not in localStorage
- Resumes linked to authenticated user accounts

---

## Project Structure

```
ResumeForge/
  app/
    api/ai/          # AI endpoints (summary, skills, enhance, suggestions)
    api/resumes/     # Resume CRUD endpoints
    auth/            # Login, register, callback pages
    builder/         # Resume editor page
    dashboard/       # User resume list page
    page.tsx         # Landing page
  components/
    builder/         # Editor panel, preview, toolbar, template selector
    dashboard/       # Resume list cards
    templates/       # Classic, Modern, Minimal renderers
    ui/              # shadcn/ui base components
  database/
    schema.sql       # Supabase table definitions
  lib/
    ai.ts            # Groq API integration
    supabase/        # Server and client Supabase helpers
    templates.ts     # Template config and registry
  store/             # Zustand resume state
  types/             # TypeScript type definitions
```

---

## Assumptions Made

- **Paid template simulation**: The "Modern" template is locked and shows an "Upgrade" modal. No real payment flow is implemented - clicking "Upgrade to Pro (Simulated)" unlocks it for the current session only.
- **PDF export**: Uses the browser's native print-to-PDF via `window.print()` with print-specific CSS. No server-side PDF generation library is used, which keeps the stack simpler and works reliably across devices.
- **AI model**: Groq's free tier with `llama-3.1-8b-instant` is used for all AI features. The model is fast enough for real-time suggestions without noticeable delay.
- **Auth**: Google OAuth requires a Google Cloud project with the correct redirect URI configured. Email/password auth works out of the box with Supabase.
- **No multi-page resumes**: The current version generates single-page resumes. Overflow is handled with font/spacing adjustments in the Design tab.

---

## License

MIT