import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { FileText, Plus, LogOut } from "lucide-react";
import { DashboardResumeList } from "@/components/dashboard/resume-list";

// Always fetch fresh data — never serve a cached version of this page
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: resumes } = await supabase
    .from("resumes")
    .select("id, title, created_at, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-xl group"
          >
            <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center transition-all duration-300 group-hover:bg-orange-400 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-orange-200">
              <FileText className="h-4 w-4 text-white transition-transform duration-300" />
            </div>
            <span className="text-gray-900">ResumeForge</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block truncate max-w-[200px]">
              {user.email}
            </span>
            <form action="/auth/signout" method="post">
              <Button
                variant="ghost"
                size="sm"
                type="submit"
                className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Welcome banner */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-orange-50 via-white to-rose-50 relative overflow-hidden">
        {/* subtle dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fdba74 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="container mx-auto px-6 py-8 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-up fill-both">
            <div>
              <p className="text-gray-400 text-sm mb-1 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                Welcome back
              </p>
              <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
              <p className="text-gray-500 text-sm mt-1">
                {resumes?.length ?? 0} resume
                {(resumes?.length ?? 0) !== 1 ? "s" : ""} in your workspace
              </p>
            </div>
            <Link href="/builder/new">
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-400 text-white border-0 shadow-lg shadow-orange-200 hover:-translate-y-0.5 transition-all duration-200 font-medium btn-shimmer"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Resume
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="container mx-auto px-6 py-10 bg-gray-50 min-h-[calc(100vh-200px)]">
        <DashboardResumeList resumes={resumes ?? []} />
      </main>
    </div>
  );
}
