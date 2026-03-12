import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useResumeStore } from '@/store/resume-store';
import { createClient } from '@/lib/supabase/client';
import { type ResumeData } from '@/types/resume';

export function useResume() {
  const router = useRouter();
  const store = useResumeStore();
  const supabase = createClient();

  const saveResume = useCallback(async () => {
    if (store.isSaving) return;

    store.setIsSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error('You must be logged in to save');
        return;
      }

      const payload = {
        title: store.title,
        data: store.data as unknown as Record<string, unknown>,
        updated_at: new Date().toISOString(),
      };

      if (store.resumeId) {
        const { error } = await supabase
          .from('resumes')
          .update(payload)
          .eq('id', store.resumeId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('resumes')
          .insert({ ...payload, user_id: user.id })
          .select('id')
          .single();

        if (error) throw error;
        if (data) {
          store.setResumeId(data.id);
          router.replace(`/builder/${data.id}`);
        }
      }

      store.setIsDirty(false);
      store.setLastSaved(new Date());
      toast.success('Resume saved');
      // Refresh server component cache so dashboard shows the updated timestamp
      router.refresh();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save resume');
    } finally {
      store.setIsSaving(false);
    }
  }, [store, supabase, router]);

  const loadResume = useCallback(
    async (id: string) => {
      try {
        const { data, error } = await supabase
          .from('resumes')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        store.setResumeId(data.id);
        store.setTitle(data.title);
        store.setData(data.data as unknown as ResumeData);
        store.setIsDirty(false);
      } catch (error) {
        console.error('Load error:', error);
        toast.error('Failed to load resume');
        router.push('/dashboard');
      }
    },
    [supabase, store, router]
  );

  const deleteResume = useCallback(
    async (id: string) => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const { error } = await supabase
          .from('resumes')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) throw error;
        toast.success('Resume deleted');
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete resume');
      }
    },
    [supabase]
  );

  const duplicateResume = useCallback(
    async (id: string) => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return null;

        const { data: original, error: fetchError } = await supabase
          .from('resumes')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;

        const { data: copy, error: insertError } = await supabase
          .from('resumes')
          .insert({
            user_id: user.id,
            title: `${original.title} (Copy)`,
            data: original.data,
          })
          .select('id')
          .single();

        if (insertError) throw insertError;
        toast.success('Resume duplicated');
        return copy?.id ?? null;
      } catch (error) {
        console.error('Duplicate error:', error);
        toast.error('Failed to duplicate resume');
        return null;
      }
    },
    [supabase]
  );

  return { saveResume, loadResume, deleteResume, duplicateResume };
}
