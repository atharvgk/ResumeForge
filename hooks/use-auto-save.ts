import { useEffect, useRef } from 'react';
import { useResumeStore } from '@/store/resume-store';
import { useResume } from './use-resume';

const AUTO_SAVE_DELAY = 3000; // 3 seconds

export function useAutoSave() {
  const isDirty = useResumeStore((state) => state.isDirty);
  const isSaving = useResumeStore((state) => state.isSaving);
  const resumeId = useResumeStore((state) => state.resumeId);
  const { saveResume } = useResume();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isDirty || isSaving || !resumeId) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      saveResume();
    }, AUTO_SAVE_DELAY);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isDirty, isSaving, resumeId, saveResume]);
}
