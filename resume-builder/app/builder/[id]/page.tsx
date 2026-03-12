import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BuilderLayout } from "@/components/builder/builder-layout";
import { type ResumeData } from "@/types/resume";

interface Props {
  params: { id: string };
}

export default async function BuilderPage({ params }: Props) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: resume, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (error || !resume) notFound();

  return (
    <BuilderLayout
      resumeId={resume.id}
      initialTitle={resume.title}
      initialData={resume.data as unknown as ResumeData}
    />
  );
}
