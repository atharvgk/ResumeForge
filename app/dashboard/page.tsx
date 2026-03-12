import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { FileText, Plus, LogOut, LayoutDashboard } from "lucide-react";
import { DashboardResumeList } from "@/components/dashboard/resume-list";

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

  const resumeCount = resumes?.length ?? 0;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl group">
            <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center transition-all duration-300 group-hover:bg-orange-400 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-orange-500/30">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-gray-900">ResumeForge</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200">
              <div className="h-5 w-5 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                {user.email?.[0]?.toUpperCase()}
              </div>
              <span className="text-sm text-gray-600 truncate max-w-[160px]">{user.email}</span>
            </div>
            <form action="/auth/signout" method="post">
              <Button variant="ghost" size="sm" type="submit"
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors gap-1.5">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="border-b border-gray-100 relative overflow-hidden bg-gray-50/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_100%_at_70%_0%,rgba(234,88,12,0.07),transparent)]" />
        <div className="container mx-auto px-6 py-8 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 animate-fade-in-up fill-both">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <LayoutDashboard className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-500 uppercase tracking-wider">Dashboard</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">My Resumes</h1>
              <p className="text-gray-500 text-sm">
                {resumeCount === 0
                  ? "No resumes yet - create your first one"
                  : `${resumeCount} resume${resumeCount !== 1 ? "s" : ""} in your workspace`}
              </p>
            </div>
            <Link href="/builder/new">
              <Button size="sm"
                className="bg-orange-500 hover:bg-orange-400 text-white border-0 shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-200 font-medium btn-shimmer h-10 px-5">
                <Plus className="h-4 w-4 mr-2" />
                New Resume
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-10 min-h-[calc(100vh-180px)]">
        <DashboardResumeList resumes={resumes ?? []} />
      </main>
    </div>
  );
}