"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatDistanceToNow, format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { createClient } from "@/lib/supabase/client";
import { FileText, MoreVertical, Edit2, Trash2, Copy, Clock, Plus } from "lucide-react";

interface Resume {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  resumes: Resume[];
}

export function DashboardResumeList({ resumes: initialResumes }: Props) {
  const router = useRouter();
  const [resumes, setResumes] = useState(initialResumes);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  // Tick every 30s so relative times stay accurate without a full page reload
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    const supabase = createClient();
    const { error } = await supabase
      .from("resumes")
      .delete()
      .eq("id", deleteId);
    if (error) {
      toast.error("Failed to delete resume");
      return;
    }
    setResumes((prev) => prev.filter((r) => r.id !== deleteId));
    setDeleteId(null);
    toast.success("Resume deleted");
  };

  const handleDuplicate = async (resume: Resume) => {
    const supabase = createClient();
    const { data: original } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", resume.id)
      .single();

    if (!original) return;

    const { data: copy, error } = await supabase
      .from("resumes")
      .insert({
        user_id: original.user_id,
        title: `${original.title} (Copy)`,
        data: original.data,
      })
      .select("id, title, created_at, updated_at")
      .single();

    if (error) {
      toast.error("Failed to duplicate resume");
      return;
    }

    if (copy) {
      setResumes((prev) => [copy, ...prev]);
      toast.success("Resume duplicated");
    }
  };

  if (resumes.length === 0) {
    return (
      <div className="text-center py-24 bg-gray-50 rounded-2xl border border-gray-200 border-dashed animate-fade-in fill-both">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 mx-auto mb-4">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No resumes yet</h3>
        <p className="text-gray-400 mb-6 max-w-xs mx-auto text-sm">
          Create your first resume to get started on your job search journey.
        </p>
        <Link href="/builder/new">
          <Button className="bg-orange-500 hover:bg-orange-400 text-white border-0 shadow-lg shadow-orange-200 hover:-translate-y-0.5 transition-all duration-200 btn-shimmer">
            <Plus className="h-4 w-4 mr-2" />
            Create Resume
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resumes.map((resume, index) => (
          <Card
            key={resume.id}
            className="group hover:shadow-xl hover:shadow-orange-100 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up fill-both overflow-hidden bg-white border-gray-200 hover:border-orange-300 card-glow relative"
            style={{ animationDelay: `${index * 75}ms` }}
          >
            {/* Animated top border */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-orange-300 via-rose-300 to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base line-clamp-2 text-gray-900">
                  {resume.title}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border-gray-200">
                    <DropdownMenuItem
                      className="text-gray-600 focus:bg-gray-100 focus:text-gray-900"
                      onClick={() => router.push(`/builder/${resume.id}`)}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-gray-600 focus:bg-gray-100 focus:text-gray-900"
                      onClick={() => handleDuplicate(resume)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-100" />
                    <DropdownMenuItem
                      className="text-red-400 focus:text-red-400 focus:bg-red-500/10"
                      onClick={() => setDeleteId(resume.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-24 bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 rounded-lg border border-orange-100 flex items-center justify-center group-hover:border-orange-200 transition-colors">
                <FileText className="h-8 w-8 text-orange-200 group-hover:text-orange-300 group-hover:scale-110 transition-all duration-300" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-1 pt-2">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Updated{" "}
                {formatDistanceToNow(new Date(resume.updated_at), {
                  addSuffix: true,
                })}
              </span>
              <div className="w-full flex justify-between items-center">
                <span className="text-xs text-gray-300">
                  Created {format(new Date(resume.created_at), "MMM d, yyyy")}
                </span>
                <Link href={`/builder/${resume.id}`}>
                  <Button size="sm" variant="outline" className="border-gray-300 text-gray-500 bg-transparent hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                    <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                    Edit
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent className="bg-white border-gray-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">Delete Resume?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">
              This action cannot be undone. The resume will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-500 text-white border-0"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
