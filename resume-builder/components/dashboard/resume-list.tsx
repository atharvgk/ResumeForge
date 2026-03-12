"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
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
import {
  FileText,
  MoreVertical,
  Edit2,
  Trash2,
  Copy,
  Clock,
} from "lucide-react";

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
      <div className="text-center py-20 bg-white rounded-xl border">
        <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-700 mb-2">
          No resumes yet
        </h3>
        <p className="text-slate-500 mb-6">
          Create your first resume to get started
        </p>
        <Link href="/builder/new">
          <Button>Create Resume</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resumes.map((resume) => (
          <Card
            key={resume.id}
            className="group hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base line-clamp-2">
                  {resume.title}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => router.push(`/builder/${resume.id}`)}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicate(resume)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
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
              <div className="h-24 bg-gradient-to-br from-slate-100 to-blue-50 rounded flex items-center justify-center">
                <FileText className="h-8 w-8 text-slate-300" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(resume.updated_at), {
                  addSuffix: true,
                })}
              </span>
              <Link href={`/builder/${resume.id}`}>
                <Button size="sm" variant="outline">
                  <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                  Edit
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The resume will be permanently
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
