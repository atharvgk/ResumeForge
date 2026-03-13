import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BuilderLayout } from "@/components/builder/builder-layout";
import { DEFAULT_RESUME_DATA } from "@/types/resume";
import { TEMPLATES } from "@/lib/templates";
import { type TemplateId } from "@/types/resume";

interface Props {
  searchParams?: { template?: string };
}

export default async function NewBuilderPage({ searchParams }: Props) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const requestedTemplate = searchParams?.template as TemplateId | undefined;
  const selectedTemplate = TEMPLATES.find(
    (template) => template.id === requestedTemplate && !template.isPaid,
  );

  const initialData = selectedTemplate
    ? {
        ...DEFAULT_RESUME_DATA,
        template: selectedTemplate.id,
        templateSettings: {
          ...DEFAULT_RESUME_DATA.templateSettings,
          primaryColor: selectedTemplate.primaryColor,
          secondaryColor: selectedTemplate.secondaryColor,
        },
      }
    : DEFAULT_RESUME_DATA;

  return (
    <BuilderLayout
      resumeId={null}
      initialTitle="Untitled Resume"
      initialData={initialData}
    />
  );
}
