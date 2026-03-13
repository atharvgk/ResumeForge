import Image from "next/image";
import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";
import { ArrowRight, FileText, LayoutTemplate, Crown } from "lucide-react";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">ResumeForge</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/templates" className="text-sm text-orange-500 font-semibold border-b-2 border-orange-500 pb-0.5">Templates</Link>
              <Link href="/#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">AI Features</Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors px-3 py-2">
              Log In
            </Link>
            <Link
              href="/auth/register"
              className="text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full transition-colors shadow-lg shadow-orange-200"
            >
              Build My Resume
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center h-14 w-14 bg-orange-100 rounded-2xl mb-4">
            <LayoutTemplate className="h-7 w-7 text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Resume Templates
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Pick a layout that fits your style, then switch templates anytime inside the editor while you build your resume.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-2xl hover:shadow-gray-200/70 transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 border-b border-gray-100">
                <Image
                  src={template.preview}
                  alt={`${template.name} template preview`}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute top-4 right-4">
                  {template.isPaid ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-bold text-white shadow-md">
                      <Crown className="h-3 w-3" />
                      PRO
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-700">
                      FREE
                    </span>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{template.name}</h2>
                  <span
                    className="h-3 w-3 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: template.primaryColor }}
                  />
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{template.description}</p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  {template.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={template.isPaid ? "/builder/new" : `/builder/new?template=${template.id}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-500"
                >
                  {template.isPaid ? "Unlock in Editor" : "Use in Editor"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-orange-200 bg-orange-50 px-8 py-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Edit first, switch anytime</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
            You do not need to commit to one layout upfront. Open the resume editor, then change between Classic, Modern, and Minimal from the template section while previewing the result live.
          </p>
          <Link
            href="/builder/new?template=classic"
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-colors hover:bg-orange-600"
          >
            Open Resume Editor
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
