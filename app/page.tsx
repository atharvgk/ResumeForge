import Link from "next/link";
import {
  Zap,
  Target,
  Layout,
  Search,
  Eye,
  Shield,
  ArrowRight,
  FileText,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import HomeNavbar from "@/components/home/navbar";

const features = [
  {
    icon: Zap,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    title: "Groq AI Engine",
    badge: "Premium",
    badgeColor: "bg-orange-100 text-orange-600",
    desc: "Harness the fastest LLM on the market to instantly rewrite your weak bullet points into high-impact achievement statements.",
  },
  {
    icon: Target,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "ATS Heatmaps",
    badge: null,
    badgeColor: "",
    desc: "Visual feedback on exactly where your resume might fail an automated scan, with suggested fixes in real-time.",
  },
  {
    icon: Layout,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    title: "Precision Templates",
    badge: null,
    badgeColor: "",
    desc: "Recruiter-approved layouts that focus on white space, typography, and scannability. Designed to be read in 6 seconds.",
  },
  {
    icon: Search,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    title: "Keyword Injector",
    badge: "New",
    badgeColor: "bg-blue-100 text-blue-700",
    desc: "Paste a job URL and we will automatically highlight the missing keywords in your resume that recruiters are searching for.",
  },
  {
    icon: Eye,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Live Previews",
    badge: null,
    badgeColor: "",
    desc: "No more Save as PDF to see changes. Our dual-pane editor shows your final document exactly as you type.",
  },
  {
    icon: Shield,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    title: "Privacy First",
    badge: null,
    badgeColor: "",
    desc: "Your data is encrypted and never sold. We only use your information to help you get hired, period.",
  },
];

const whyPoints = [
  "AI that understands industry-specific jargon",
  "Pixel-perfect A4 and US Letter exports",
  "Direct feedback from ex-Google recruiters",
  "Unlimited versions for every job application",
];

const footerPrimaryLinks = [
  { label: "Home", href: "/" },
  { label: "Templates", href: "/templates" },
  { label: "Dashboard", href: "/dashboard" },
];

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userInfo = user
    ? {
        name:
          (user.user_metadata?.full_name as string | undefined) ??
          (user.user_metadata?.name as string | undefined) ??
          null,
        email: user.email ?? null,
      }
    : null;

  const footerAccountLinks = userInfo
    ? [
        { label: "Dashboard", href: "/dashboard" },
        { label: "New Resume", href: "/builder/new" },
      ]
    : [
        { label: "Log In", href: "/auth/login" },
        { label: "Create Account", href: "/auth/register" },
        { label: "Build Resume", href: "/builder/new" },
      ];

  return (
    <div className="min-h-screen bg-white">

      {/* ---- NAVBAR ---- */}
      <HomeNavbar user={userInfo} />

      {/* ---- HERO ---- */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="space-y-8">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-700">NEW</span>
              <span className="text-xs text-gray-500">Groq AI integration is now live</span>
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="text-6xl font-black leading-tight tracking-tight text-gray-900">
                Resumes that
              </h1>
              <h1 className="text-6xl font-black leading-tight tracking-tight italic text-orange-500">
                actually work.
              </h1>
            </div>

            <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
              Stop screaming into the void. Our AI analyzes job descriptions in real-time to craft{" "}
              <span className="font-semibold text-gray-700">ATS-proof resumes</span>{" "}
              that land 3x more interviews.
            </p>

            {/* CTAs + social proof */}
            <div className="flex items-center gap-5 flex-wrap">
              <Link
                href={userInfo ? "/builder/new" : "/auth/register"}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-full transition-colors shadow-xl shadow-orange-200 text-sm"
              >
                {userInfo ? "Build New Resume" : "Create Resume Free"} <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["bg-blue-400", "bg-purple-400", "bg-pink-400", "bg-yellow-400"].map((c, i) => (
                    <div
                      key={i}
                      className={`h-8 w-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="h-3.5 w-3.5 fill-orange-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">4.8/5 from job seekers</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-2">
              <div>
                <p className="text-3xl font-black text-gray-900">94%</p>
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">ATS Pass Rate</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <p className="text-3xl font-black text-gray-900">2min</p>
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">Avg. Build Time</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <p className="text-3xl font-black text-gray-900">Free</p>
                <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">No Credit Card</p>
              </div>
            </div>
          </div>

          {/* Right - AI Editor Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* ATS Score floating badge */}
              <div className="absolute -top-5 -right-2 z-10 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 shadow-lg">
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wide">ATS Score: 98</p>
                <p className="text-sm font-black text-emerald-600">OPTIMAL / ATS!</p>
              </div>

              {/* Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl shadow-gray-300/40 overflow-hidden">
                {/* macOS-style title bar */}
                <div className="bg-gray-900 px-4 py-3 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-2 text-xs text-gray-400 font-medium">AI EDITOR DRAFT C</span>
                </div>

                {/* Content skeleton */}
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-gray-900 rounded-full w-2/3" />
                  <div className="space-y-2 pt-1">
                    <div className="h-2.5 bg-orange-300 rounded-full w-full" />
                    <div className="h-2.5 bg-orange-200 rounded-full w-5/6" />
                    <div className="h-2.5 bg-orange-100 rounded-full w-4/6" />
                  </div>
                  <div className="space-y-2 pt-3">
                    <div className="h-2 bg-gray-100 rounded-full w-full" />
                    <div className="h-2 bg-gray-100 rounded-full w-11/12" />
                    <div className="h-2 bg-gray-100 rounded-full w-4/5" />
                    <div className="h-2 bg-gray-100 rounded-full w-3/4" />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="h-2 bg-gray-100 rounded-full w-full" />
                    <div className="h-2 bg-gray-100 rounded-full w-2/3" />
                  </div>
                </div>

                {/* AI Improvement Applied overlay card */}
                <div className="mx-4 mb-5 bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-5 w-5 rounded-md bg-orange-500 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-xs font-bold text-gray-800">AI Improvement Applied</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">
                    Led cross-functional teams to deliver 40% increase in deployment efficiency...
                  </p>
                  <div className="flex gap-2">
                    <button className="text-xs font-semibold text-gray-500 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-100 transition-colors">
                      UNDO
                    </button>
                    <button className="text-xs font-bold bg-orange-500 text-white rounded-lg px-3 py-1.5 hover:bg-orange-600 transition-colors">
                      CONFIRM
                    </button>
                  </div>
                </div>
              </div>

              {/* Background glow */}
              <div className="absolute inset-0 -z-10 bg-orange-400/20 rounded-3xl blur-3xl scale-110" />
            </div>
          </div>
        </div>
      </section>

      {/* ---- COMPANY LOGOS STRIP ---- */}
      <section className="bg-gray-50 border-y border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-bold text-gray-400 tracking-[0.25em] uppercase mb-8">
            Our graduates work at world-class companies
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-7 w-20 bg-gray-300 rounded opacity-40" />
            ))}
          </div>
        </div>
      </section>

      {/* ---- FEATURES ---- */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-orange-500 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 uppercase mb-6">
              Unfair Advantage
            </span>
            <h2 className="text-5xl font-black text-gray-900 leading-tight">
              Crafted for results,
            </h2>
            <h2 className="text-5xl font-black italic text-orange-500 leading-tight underline decoration-orange-300 decoration-2">
              optimized for humans.
            </h2>
            <p className="mt-5 text-gray-500 max-w-lg mx-auto leading-relaxed">
              Building a resume should not feel like a chore. Our toolbox gives you everything you need to stand out in a crowded inbox.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-gray-100/80 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`h-10 w-10 rounded-xl ${f.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <f.icon className={`h-5 w-5 ${f.iconColor}`} />
                  </div>
                  {f.badge && (
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${f.badgeColor}`}>
                      {f.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- DARK SECTION ---- */}
      <section className="bg-[#0d0d1d] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-5xl font-black text-white leading-tight">Why settle for a</h2>
                <h2 className="text-5xl font-black text-orange-400 leading-tight">generic template?</h2>
              </div>
              <ul className="space-y-4">
                {whyPoints.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-orange-500 flex-shrink-0" />
                    <span className="text-gray-300 text-base">{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full transition-colors text-sm"
              >
                View Our Templates
              </Link>
            </div>

            {/* Right - Health Check Card */}
            <div className="flex lg:justify-end">
              <div className="bg-[#16162a] border border-white/10 rounded-2xl p-7 w-full max-w-sm">
                <div className="flex items-center justify-between mb-7">
                  <h3 className="text-white font-bold text-base">Resume Health Check</h3>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-3 py-1 tracking-widest uppercase">
                    Excellent
                  </span>
                </div>
                {[
                  { label: "Readability", value: 90 },
                  { label: "Keyword Density", value: 85 },
                  { label: "Impact Score", value: 95 },
                ].map((metric) => (
                  <div key={metric.label} className="mb-5 last:mb-0">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">{metric.label}</span>
                      <span className="text-sm font-bold text-white">{metric.value}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full transition-all"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="mt-7 space-y-2">
                  <div className="h-2 bg-white/5 rounded-full w-full" />
                  <div className="h-2 bg-white/5 rounded-full w-3/4" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---- ORANGE CTA SECTION ---- */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-orange-500 rounded-3xl py-20 px-8 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative">
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
              Stop applying.
            </h2>
            <h2 className="text-5xl md:text-6xl font-black italic text-white underline decoration-white/40 leading-tight mb-5">
              Start interviewing.
            </h2>
            <p className="text-white/80 text-base mb-10 max-w-md mx-auto leading-relaxed">
              Join 12,402+ job seekers who landed roles at Google, Meta, and OpenAI this month.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href={userInfo ? "/dashboard" : "/auth/register"}
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-full transition-colors text-sm shadow-xl"
              >
                {userInfo ? "Go to Dashboard" : "Get Started Free"} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 border-2 border-white/50 hover:border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-full transition-colors text-sm"
              >
                View Templates
              </Link>
            </div>
            <p className="mt-6 text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase">
              No credit card required &bull; Instant download &bull; 100% Free
            </p>
          </div>
        </div>
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr] mb-12">

            {/* Brand column */}
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <span className="text-base font-bold text-gray-900">ResumeForge</span>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed mb-5">
                The world&#39;s most sophisticated AI-powered resume builder. We&#39;re on a mission to help everyone land their dream job through better storytelling and data.
              </p>
              <p className="text-xs font-semibold text-orange-500 uppercase tracking-[0.2em]">
                AI-powered resume building for real applications
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-[10px] font-bold text-gray-800 uppercase tracking-widest mb-4">Navigation</h4>
              <ul className="space-y-3">
                {footerPrimaryLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4 className="text-[10px] font-bold text-gray-800 uppercase tracking-widest mb-4">Account</h4>
              <ul className="space-y-3">
                {footerAccountLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h4 className="text-[10px] font-bold text-gray-800 uppercase tracking-widest mb-4">Get Started</h4>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                Start a new resume, customize a template, and export it whenever you need.
              </p>
              <Link
                href={userInfo ? "/builder/new" : "/auth/register"}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors shadow-lg shadow-orange-200"
              >
                {userInfo ? "New Resume" : "Build My Resume"} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-400">&#169; 2024 ResumeForge Inc. All rights reserved.</p>
            <p className="text-xs text-gray-400">Built with Next.js, Supabase, and Groq AI.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}