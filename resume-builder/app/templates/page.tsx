import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TEMPLATES } from "@/lib/templates";
import { LayoutTemplate } from "lucide-react";
import { FileText } from "lucide-react";

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <FileText className="h-6 w-6 text-blue-600" />
            ResumeForge
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-14 w-14 bg-blue-100 rounded-xl mb-4">
            <LayoutTemplate className="h-7 w-7 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Resume Templates
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose from our professionally designed templates, each crafted to
            make your resume stand out.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TEMPLATES.map((template) => (
            <Card
              key={template.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div
                className="h-48 flex items-center justify-center"
                style={{ backgroundColor: `${template.primaryColor}15` }}
              >
                <div className="text-center p-6">
                  <div
                    className="h-3 rounded-full mb-3 w-2/3 mx-auto"
                    style={{ backgroundColor: template.primaryColor }}
                  />
                  <div className="h-2 bg-slate-200 rounded mb-2 w-full" />
                  <div className="h-2 bg-slate-200 rounded mb-2 w-5/6" />
                  <div className="h-2 bg-slate-200 rounded w-4/6" />
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div
                      className="h-8 rounded"
                      style={{ backgroundColor: `${template.primaryColor}30` }}
                    />
                    <div
                      className="h-8 rounded"
                      style={{ backgroundColor: `${template.primaryColor}30` }}
                    />
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{template.name}</CardTitle>
                  <Badge variant="secondary">Free</Badge>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-slate-600 space-y-1">
                  {template.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/auth/register?template=${template.id}`}
                  className="w-full"
                >
                  <Button className="w-full">Use This Template</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
