"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 8);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min((window.scrollY / docHeight) * 100, 100) : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] bg-gradient-to-r from-orange-400 via-rose-400 to-orange-500 transition-[width] duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      <nav
        className={cn(
          "border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300",
          scrolled ? "shadow-lg shadow-gray-200" : "shadow-none",
        )}
      >
        {children}
      </nav>
    </>
  );
}
