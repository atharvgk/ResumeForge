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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <FileText className="h-6 w-6 text-blue-600" />
            ResumeForge
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{user.email}</span>
            <form action="/auth/signout" method="post">
              <Button variant="ghost" size="sm" type="submit">
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Resumes</h1>
            <p className="text-slate-600 mt-1">Manage and edit your resumes</p>
          </div>
          <Link href="/builder/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Resume
            </Button>
          </Link>
        </div>

        <DashboardResumeList resumes={resumes ?? []} />
      </main>
    </div>
  );
}
