"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { FileText } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) toast.error(decodeURIComponent(error));
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginValues) => {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
    // On success the browser navigates away, no need to setLoading(false)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 relative overflow-hidden">
      {/* grid bg */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,0.04) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-orange-100/20 blur-3xl -z-10" />

      <div className="w-full max-w-sm relative z-10 animate-fade-in-up fill-both">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-200 group-hover:bg-orange-400 transition-colors">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ResumeForge</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-2xl shadow-gray-300">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-900">Welcome back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full h-10 px-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/30 transition-colors"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium text-gray-600">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full h-10 px-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/30 transition-colors"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-400 uppercase tracking-wider">Or</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-10 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium transition-colors disabled:opacity-50"
          >
            Sign in with Google
          </button>

          <p className="text-center text-sm text-gray-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-orange-600 hover:text-orange-600 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
