import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Plus, LayoutDashboard } from "lucide-react";
import { DashboardResumeList } from "@/components/dashboard/resume-list";
import HomeNavbar from "@/components/home/navbar";

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

  const userInfo = {
    name:
      (user.user_metadata?.full_name as string | undefined) ??
      (user.user_metadata?.name as string | undefined) ??
      null,
    email: user.email ?? null,
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <HomeNavbar user={userInfo} />

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