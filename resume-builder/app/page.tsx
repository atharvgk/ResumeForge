import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { createClient } from "@/lib/supabase/server";
import {
  FileText,
  Zap,
  Palette,
  Download,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative container mx-auto px-4 pt-28 pb-24 text-center">
        {/* grid bg */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(to right,rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.04) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* radial glows - layered for depth */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[1000px] rounded-full bg-orange-50 blur-3xl -z-10 animate-glow-pulse" />
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-[280px] w-[480px] rounded-full bg-rose-50 blur-2xl -z-10" />

        <div className="animate-fade-in-down fill-both">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-sm mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            AI-Powered Resume Builder
            <Sparkles className="h-3.5 w-3.5" />
          </span>
        </div>

        <h1
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up fill-both leading-[1.1] text-gray-900"
          style={{ animationDelay: "100ms" }}
        >
          Build a Resume That
          <br />
          <span className="gradient-text">Gets You Hired</span>
        </h1>

        <p
          className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 animate-fade-in-up fill-both"
          style={{ animationDelay: "200ms" }}
        >
          Create professional resumes with AI suggestions, beautiful templates,
          and real-time previews. Export to PDF in seconds.
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up fill-both"
          style={{ animationDelay: "300ms" }}
        >
          {user ? (
            <>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="group h-12 px-8 text-base bg-orange-500 hover:bg-orange-400 text-white border-0 shadow-lg shadow-orange-200 hover:-translate-y-0.5 transition-all duration-200 btn-shimmer"
                >
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/builder/new">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base border-gray-300 text-gray-600 bg-transparent hover:bg-gray-100 hover:text-gray-900 hover:-translate-y-0.5 transition-all duration-200"
                >
                  New Resume
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="group h-12 px-8 text-base bg-orange-500 hover:bg-orange-400 text-white border-0 shadow-lg shadow-orange-200 hover:-translate-y-0.5 transition-all duration-200 btn-shimmer"
                >
                  Start for Free <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base border-gray-300 text-gray-600 bg-transparent hover:bg-gray-100 hover:text-gray-900 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Feature trust bar */}
        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 animate-fade-in-up fill-both"
          style={{ animationDelay: "400ms" }}
        >
          {[
            "No credit card required",
            "3 professional templates",
            "PDF export in seconds",
            "ATS-friendly formats",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle className="h-4 w-4 text-orange-600 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="container mx-auto px-4 pt-10 pb-24">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600 mb-4">
            Features
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            Everything You Need
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            All the tools to build a standout resume — in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: Zap,
              color: "text-amber-600",
              bg: "bg-amber-50",
              border: "border-amber-200",
              glow: "hover:shadow-amber-200",
              title: "AI-Powered Suggestions",
              desc: "Smart suggestions powered by Google Gemini to improve every section of your resume.",
              detail: "Enhance bullet points, summary, and skills with one click.",
            },
            {
              icon: Palette,
              color: "text-orange-600",
              bg: "bg-orange-50",
              border: "border-orange-200",
              glow: "hover:shadow-orange-200",
              title: "Professional Templates",
              desc: "Choose from Classic, Modern, and Minimal templates — each fully customizable.",
              detail: "Change colors, fonts, and spacing to match your style.",
            },
            {
              icon: Download,
              color: "text-cyan-600",
              bg: "bg-cyan-50",
              border: "border-cyan-200",
              glow: "hover:shadow-cyan-200",
              title: "Instant PDF Export",
              desc: "Download a print-ready PDF whenever you are ready to apply.",
              detail: "Auto-saves as you type so you never lose progress.",
            },
          ].map((f, i) => (
            <div
              key={f.title}
              className={`group relative rounded-2xl border ${f.border} bg-white p-6 hover:border-orange-300 hover:-translate-y-1 hover:shadow-xl card-glow transition-all duration-300 animate-fade-in-up fill-both overflow-hidden`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Animated top border sweep */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-orange-300 via-rose-300 to-amber-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.bg} border ${f.border} mb-5 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}
              >
                <f.icon className={`h-5 w-5 ${f.color}`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{f.desc}</p>
              <p className="text-sm text-gray-400 flex items-start gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                {f.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-y border-gray-200/60 bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-600 mb-4">
              How it works
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              Three Steps to Your Perfect Resume
            </h2>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {/* Connector line between steps on desktop */}
            <div className="hidden md:block absolute top-7 left-[17%] right-[17%] h-px bg-gradient-to-r from-orange-100 via-orange-300 to-orange-100" />
            {[
              {
                step: "01",
                title: "Fill in your details",
                desc: "Add your experience, skills, and education using our intuitive form editor.",
              },
              {
                step: "02",
                title: "Choose your template",
                desc: "Pick from 3 beautiful templates and customize colors, fonts, and spacing.",
              },
              {
                step: "03",
                title: "Export & apply",
                desc: "Download your resume as a pixel-perfect PDF and start applying.",
              },
            ].map((s, i) => (
              <div
                key={s.step}
                className="text-center animate-fade-in-up fill-both"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 text-xl font-bold mb-4 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:scale-110 hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 relative z-10">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-white to-rose-50" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-orange-100/20 blur-3xl -z-10" />
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 animate-fade-in-up fill-both text-gray-900">
            Ready to Build Your{" "}
            <span className="gradient-text">Dream Resume?</span>
          </h2>
          <p
            className="text-gray-500 mb-10 max-w-xl mx-auto text-lg animate-fade-in-up fill-both"
            style={{ animationDelay: "100ms" }}
          >
            Join thousands of job seekers who landed their dream job with
            ResumeForge.
          </p>
          <div
            className="animate-fade-in-up fill-both"
            style={{ animationDelay: "200ms" }}
          >
            {user ? (
              <Link href="/builder/new">
                <Button
                  size="lg"
                  className="group h-12 px-10 text-base bg-orange-500 hover:bg-orange-400 text-white border-0 shadow-2xl shadow-orange-200 hover:-translate-y-0.5 transition-all duration-200 btn-shimmer"
                >
                  Create a New Resume <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="group h-12 px-10 text-base bg-orange-500 hover:bg-orange-400 text-white border-0 shadow-2xl shadow-orange-200 hover:-translate-y-0.5 transition-all duration-200 btn-shimmer"
                >
                  Create Your Resume Now{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
            )}
          </div>
          <p className="mt-5 text-sm text-gray-400 flex items-center justify-center gap-1.5 animate-fade-in-up fill-both" style={{ animationDelay: '300ms' }}>
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            No credit card required — free to get started
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
          <div className="flex items-center gap-2 font-semibold text-gray-600">
            <FileText className="h-4 w-4 text-orange-600" />
            ResumeForge
          </div>
          <p>© 2026 ResumeForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
