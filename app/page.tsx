import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { createClient } from "@/lib/supabase/server";
import {
  FileText,
  Zap,
  Download,
  ArrowRight,
  CheckCircle,
  Sparkles,
  BarChart3,
  Shield,
  Brain,
  Target,
  LayoutTemplate,
} from "lucide-react";

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(234,88,12,0.07),transparent)]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right,rgba(0,0,0,0.5) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.5) 1px,transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div
            className="absolute top-1/3 right-[10%] h-80 w-80 rounded-full bg-orange-400/10 blur-3xl"
            style={{ animation: "glow-pulse 4s ease-in-out infinite" }}
          />
          <div
            className="absolute bottom-1/3 left-[10%] h-96 w-96 rounded-full bg-violet-400/8 blur-3xl"
            style={{ animation: "glow-pulse 6s ease-in-out infinite" }}
          />
        </div>

        <div className="container mx-auto px-4 pt-16 pb-20 grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left: copy */}
          <div>
            <div className="animate-fade-in-down fill-both">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-sm mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                AI-Powered | ATS-Optimized | Free
                <Sparkles className="h-3.5 w-3.5" />
              </span>
            </div>

            <h1
              className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.07] animate-fade-in-up fill-both"
              style={{ animationDelay: "100ms" }}
            >
              Resumes that
              <br />
              <span className="gradient-text">get you hired</span>
            </h1>

            <p
              className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed animate-fade-in-up fill-both"
              style={{ animationDelay: "200ms" }}
            >
              Build ATS-optimized resumes with AI that writes like a recruiter.
              3 professional templates, real-time preview, and one-click PDF
              export.
            </p>

            <div
              className="flex flex-wrap gap-4 mb-12 animate-fade-in-up fill-both"
              style={{ animationDelay: "300ms" }}
            >
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="group h-12 px-8 text-base bg-orange-500 hover:bg-orange-400 text-white border-0 shadow-2xl shadow-orange-500/25 hover:-translate-y-0.5 transition-all duration-200 btn-shimmer"
                    >
                      Go to Dashboard{" "}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/builder/new">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 px-8 text-base border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-200"
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
                      className="group h-12 px-8 text-base bg-orange-500 hover:bg-orange-400 text-white border-0 shadow-2xl shadow-orange-500/25 hover:-translate-y-0.5 transition-all duration-200 btn-shimmer"
                    >
                      Start Building Free{" "}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-12 px-8 text-base border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div
              className="flex flex-wrap gap-x-6 gap-y-2 animate-fade-in-up fill-both"
              style={{ animationDelay: "400ms" }}
            >
              {[
                "No credit card required",
                "3 professional templates",
                "ATS-friendly formats",
                "PDF in seconds",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-400"
                >
                  <CheckCircle className="h-4 w-4 text-orange-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: App mockup */}
          <div className="relative hidden lg:flex items-center justify-center animate-fade-in fill-both">
            <div className="absolute inset-0 -z-10 bg-orange-400/5 rounded-3xl blur-3xl scale-110" />

            <div className="relative w-full max-w-[520px] rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-2xl shadow-gray-200/80 ring-1 ring-gray-100">
              {/* Browser chrome */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/70" />
                  <div className="h-3 w-3 rounded-full bg-green-400/70" />
                </div>
                <div className="flex-1 h-6 rounded-md bg-gray-100 border border-gray-200 flex items-center px-3">
                  <span className="text-[10px] text-gray-400">
                    resumeforge.app/builder
                  </span>
                </div>
              </div>

              {/* Builder layout mockup */}
              <div className="flex" style={{ height: "360px" }}>
                {/* Sidebar */}
                <div className="w-[165px] border-r border-gray-100 bg-gray-50/80 p-3 shrink-0 flex flex-col">
                  <div className="flex gap-1 mb-3">
                    {["Content", "Design"].map((t, i) => (
                      <div
                        key={t}
                        className={`flex-1 text-center text-[9px] py-1.5 rounded-md font-medium ${
                          i === 0
                            ? "bg-orange-500/20 text-orange-600 border border-orange-500/25"
                            : "text-gray-400"
                        }`}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-0.5 flex-1">
                    {[
                      { name: "Personal Info", active: false },
                      { name: "Experience", active: true },
                      { name: "Education", active: false },
                      { name: "Skills", active: false },
                      { name: "Projects", active: false },
                    ].map(({ name, active }) => (
                      <div
                        key={name}
                        className={`text-[9px] px-2 py-1.5 rounded-md ${
                          active
                            ? "bg-orange-500/15 text-orange-600 border border-orange-500/20"
                            : "text-gray-400"
                        }`}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 px-2 py-2.5 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Zap className="h-2.5 w-2.5 text-orange-500" />
                      <span className="text-[8px] text-orange-600 font-semibold">
                        AI Improve
                      </span>
                    </div>
                    <div className="h-1 w-full bg-gray-200 rounded-full">
                      <div className="h-1 w-[65%] bg-gradient-to-r from-orange-500 to-rose-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Resume preview pane */}
                <div className="flex-1 p-3 bg-gray-100/60">
                  <div className="bg-white rounded-xl h-full p-4 shadow-md overflow-hidden border border-gray-100">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="h-3.5 w-28 bg-gray-800 rounded-sm mb-1.5" />
                        <div className="h-2 w-20 bg-orange-500 rounded-sm mb-1" />
                        <div className="h-1.5 w-32 bg-gray-200 rounded-sm" />
                      </div>
                    </div>
                    <div className="h-px w-full bg-orange-100 my-2.5" />
                    <div className="h-2 w-16 bg-gray-700 rounded mb-2" />
                    <div className="space-y-1 mb-3">
                      <div className="h-1.5 w-full bg-gray-100 rounded" />
                      <div className="h-1.5 w-5/6 bg-gray-100 rounded" />
                    </div>
                    <div className="h-2 w-20 bg-gray-700 rounded mb-2" />
                    <div className="flex justify-between mb-1.5">
                      <div className="h-1.5 w-24 bg-gray-700 rounded" />
                      <div className="h-1.5 w-14 bg-gray-200 rounded" />
                    </div>
                    <div className="space-y-1 mb-3 pl-2 border-l-2 border-orange-200">
                      <div className="h-1.5 w-full bg-gray-100 rounded" />
                      <div className="h-1.5 w-4/5 bg-gray-100 rounded" />
                      <div className="h-1.5 w-3/4 bg-gray-100 rounded" />
                    </div>
                    <div className="h-2 w-12 bg-gray-700 rounded mb-2" />
                    <div className="flex flex-wrap gap-1">
                      {[40, 32, 36, 28, 44, 30].map((w, i) => (
                        <div
                          key={i}
                          className="h-4 rounded-full bg-orange-50 border border-orange-200"
                          style={{ width: `${w}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating ATS badge */}
            <div className="absolute -top-5 -right-6 bg-white border border-gray-200 rounded-2xl px-3.5 py-2.5 shadow-xl shadow-gray-200/60 animate-float">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-900">
                    94% ATS Score
                  </div>
                  <div className="text-[10px] text-gray-400">
                    Excellent match
                  </div>
                </div>
              </div>
            </div>

            {/* Floating AI badge */}
            <div className="absolute -bottom-5 -left-6 bg-white border border-gray-200 rounded-2xl px-3.5 py-2.5 shadow-xl shadow-gray-200/60">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-orange-500" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-900">
                    AI Enhanced
                  </div>
                  <div className="text-[10px] text-gray-400">
                    3 improvements applied
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="border-y border-gray-100 bg-gray-50/80">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
            {[
              { value: "3", label: "Pro Templates" },
              { value: "100%", label: "ATS Compatible" },
              { value: "AI", label: "Groq Powered" },
              { value: "Free", label: "No Credit Card" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold bg-gradient-to-br from-orange-500 to-rose-500 bg-clip-text text-transparent mb-1">
                  {s.value}
                </div>
                <div className="text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">
            Features
          </span>
          <h2 className="text-4xl font-bold text-gray-900">
            Everything you need to land the job
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            All the tools to build a standout, ATS-optimized resume - in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {/* AI card */}
          <div className="group md:col-span-2 relative rounded-2xl border border-gray-200 bg-white p-8 overflow-hidden hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/8 transition-all duration-300">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <div className="h-12 w-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Brain className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              AI-Powered Enhancements
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Groq-powered AI rewrites your experience bullets, generates
              professional summaries, and suggests ATS-relevant skills - in the
              voice of someone owning their achievements. Review before applying,
              always.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Improve bullets",
                "Generate summary",
                "Suggest skills",
                "ATS optimize",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Templates card */}
          <div className="group relative rounded-2xl border border-gray-200 bg-white p-8 overflow-hidden hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/8 transition-all duration-300">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <div className="h-12 w-12 rounded-2xl bg-violet-50 border border-violet-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <LayoutTemplate className="h-6 w-6 text-violet-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              3 Premium Templates
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Classic, Modern, Minimal. Each fully customizable - change colors,
              fonts, and spacing in real time.
            </p>
          </div>

          {/* PDF card */}
          <div className="group relative rounded-2xl border border-gray-200 bg-white p-8 overflow-hidden hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/8 transition-all duration-300">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <div className="h-12 w-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Download className="h-6 w-6 text-cyan-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Instant PDF Export
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Pixel-perfect A4 PDF with one click. Auto-saves every 3 seconds so
              you never lose progress.
            </p>
          </div>

          {/* ATS card */}
          <div className="group relative rounded-2xl border border-gray-200 bg-white p-8 overflow-hidden hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/8 transition-all duration-300">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              ATS Score Checker
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Paste a job description and instantly see how well your resume
              matches with a detailed compatibility score.
            </p>
          </div>

          {/* Auto-save card */}
          <div className="group relative rounded-2xl border border-gray-200 bg-white p-8 overflow-hidden hover:border-rose-300 hover:shadow-lg hover:shadow-rose-500/8 transition-all duration-300">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <div className="h-12 w-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-6 w-6 text-rose-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Auto-save &amp; Sync
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Every change syncs to your account automatically. Pick up where
              you left off on any device.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-gray-100 bg-gray-50/80 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-orange-500 mb-4">
              How it works
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              From blank page to hired - in 3 steps
            </h2>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
            <div className="hidden md:block absolute top-7 left-[17%] right-[17%] h-px bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200" />
            {[
              {
                step: "01",
                title: "Fill in your details",
                desc: "Add experience, skills, and education using the intuitive form editor with real-time preview.",
              },
              {
                step: "02",
                title: "Let AI enhance it",
                desc: "Hit the AI buttons to improve bullet points, generate your summary, and optimize for ATS keywords.",
              },
              {
                step: "03",
                title: "Export & apply",
                desc: "Download a pixel-perfect PDF and start applying with confidence.",
              },
            ].map((s, i) => (
              <div
                key={s.step}
                className="text-center animate-fade-in-up fill-both"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 text-xl font-bold mb-6 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 relative z-10">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-32 bg-gray-900">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 via-gray-900 to-violet-900/30" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-orange-500/8 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-white animate-fade-in-up fill-both">
            Ready to build your{" "}
            <span className="gradient-text">dream resume?</span>
          </h2>
          <p
            className="text-gray-400 mb-12 max-w-xl mx-auto text-lg animate-fade-in-up fill-both"
            style={{ animationDelay: "100ms" }}
          >
            Free to use. No credit card required. Start in under 2 minutes.
          </p>
          <div
            className="animate-fade-in-up fill-both"
            style={{ animationDelay: "200ms" }}
          >
            {user ? (
              <Link href="/builder/new">
                <Button
                  size="lg"
                  className="group h-14 px-12 text-lg bg-orange-500 hover:bg-orange-400 text-white border-0 shadow-2xl shadow-orange-500/30 hover:-translate-y-1 transition-all duration-200 btn-shimmer"
                >
                  Create a New Resume{" "}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="group h-14 px-12 text-lg bg-orange-500 hover:bg-orange-400 text-white border-0 shadow-2xl shadow-orange-500/30 hover:-translate-y-1 transition-all duration-200 btn-shimmer"
                >
                  Start for Free{" "}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-gray-700 text-base">
              ResumeForge
            </span>
          </div>
          <p>&copy; 2026 ResumeForge. Built for job seekers.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/auth/login"
              className="hover:text-gray-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="hover:text-gray-600 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}