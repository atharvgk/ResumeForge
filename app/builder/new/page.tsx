import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BuilderLayout } from "@/components/builder/builder-layout";
import { DEFAULT_RESUME_DATA } from "@/types/resume";

export default async function NewBuilderPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <BuilderLayout
      resumeId={null}
      initialTitle="Untitled Resume"
      initialData={DEFAULT_RESUME_DATA}
    />
  );
}
