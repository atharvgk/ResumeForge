# ResumeForge

A full-stack resume builder with AI-powered suggestions, professional templates, and one-click PDF export.

## Tech Stack

- **Framework**: Next.js 14.2.5 (App Router, TypeScript)
- **Styling**: Tailwind CSS v3 + shadcn/ui components
- **Auth & Database**: Supabase
- **AI**: Google Generative AI (Gemini Pro)
- **State**: Zustand with persistence
- **Forms**: React Hook Form + Zod
- **Drag & Drop**: @dnd-kit
- **PDF**: @react-pdf/renderer

## Setup

### 1. Clone and install

```bash
git clone https://github.com/your-username/resume-forge.git
cd resume-forge/resume-builder
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in the following values in `.env.local`:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `GOOGLE_AI_API_KEY` | Google AI API key (Gemini Pro) |

### 3. Set up the database

Run the SQL in `database/schema.sql` in your Supabase SQL editor.

Enable Google OAuth in Supabase Authentication > Providers.

### 4. Run the development server

```bash
npm run dev
```

Open http://localhost:3000.

## Features

- **3 Resume Templates**: Classic, Modern, Minimal
- **AI Suggestions**: Powered by Google Gemini — improve any section with one click
- **Auto-save**: Changes are saved automatically after 3 seconds of inactivity
- **Real-time Preview**: Side-by-side editor and preview
- **PDF Export**: Download your resume as PDF via the browser print dialog
- **Section Management**: Show/hide and reorder resume sections
- **Design Customization**: Choose template, color, font, and spacing
- **Authentication**: Email/password and Google OAuth

## Project Structure

```
resume-builder/
+-- app/                    # Next.js App Router pages
¦   +-- api/                # API routes
¦   ¦   +-- ai/             # AI suggestion & enhance endpoints
¦   ¦   +-- export/         # PDF export endpoint
¦   ¦   +-- resumes/        # Resume CRUD endpoints
¦   +-- auth/               # Auth pages (login, register, callback)
¦   +-- builder/            # Resume editor pages
¦   +-- dashboard/          # User dashboard
¦   +-- templates/          # Templates gallery
+-- components/
¦   +-- builder/            # Builder-specific components
¦   +-- dashboard/          # Dashboard components
¦   +-- forms/              # Section form components
¦   +-- templates/          # Resume template renderers
¦   +-- ui/                 # shadcn/ui components
+-- database/               # SQL schema
+-- hooks/                  # Custom React hooks
+-- lib/                    # Utilities and integrations
¦   +-- supabase/           # Supabase clients
¦   +-- ai.ts               # Google AI integration
¦   +-- templates.ts        # Template configurations
¦   +-- utils.ts            # cn() utility
¦   +-- validations.ts      # Zod schemas
+-- store/                  # Zustand stores
+-- types/                  # TypeScript types
```

## Deployment

Deploy to Vercel:

```bash
npm run build
```

Set environment variables in your Vercel project settings.

## License

MIT
