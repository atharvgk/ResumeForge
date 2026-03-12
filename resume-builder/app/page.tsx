import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="container mx-auto px-4 py-24 text-center">
        <Badge variant="outline" className="mb-4">
          AI-Powered Resume Builder
        </Badge>
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Build a Resume That
          <br />
          Gets You Hired
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Create professional resumes with AI suggestions, beautiful templates,
          and real-time previews. Export to PDF in seconds.
        </p>
        <div className="flex items-center justify-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
              <Link href="/builder/new">
                <Button size="lg" variant="outline">
                  New Resume
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/register">
                <Button size="lg">Start for Free</Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline">
                  Browse Templates
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Suggestions</CardTitle>
              <CardDescription>
                Get smart suggestions powered by Google Gemini to improve every
                section of your resume.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Enhance your bullet points, summary, and skills with one click.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Professional Templates</CardTitle>
              <CardDescription>
                Choose from Classic, Modern, and Minimal templates — each fully
                customizable.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Change colors, fonts, and spacing to match your style.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Instant PDF Export</CardTitle>
              <CardDescription>
                Download a print-ready PDF version of your resume whenever you
                are ready to apply.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Auto-saves as you type so you never lose progress.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Build Your Resume?</h2>
        <p className="text-muted-foreground mb-8">
          Join thousands of job seekers who landed their dream job with ResumeForge.
        </p>
        {user ? (
          <Link href="/builder/new">
            <Button size="lg">Create a New Resume</Button>
          </Link>
        ) : (
          <Link href="/auth/register">
            <Button size="lg">Create Your Resume Now</Button>
          </Link>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>2026 ResumeForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}