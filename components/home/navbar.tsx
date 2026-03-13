"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, LayoutDashboard, Plus, LogOut, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface UserInfo {
  name: string | null;
  email: string | null;
}

interface HomeNavbarProps {
  user: UserInfo | null;
}

export default function HomeNavbar({ user }: HomeNavbarProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  // Derive display name and initials
  const displayName = user?.name ?? user?.email?.split("@")[0] ?? "User";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: logo + nav links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">ResumeForge</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/templates" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Templates
            </Link>
            <Link href="#features" className="text-sm text-orange-500 font-semibold border-b-2 border-orange-500 pb-0.5">
              AI Features
            </Link>
          </div>
        </div>

        {/* Right: auth area */}
        <div className="flex items-center gap-3">
          {user ? (
            /* ---- LOGGED IN ---- */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2.5 hover:bg-gray-50 rounded-full pl-1 pr-3 py-1 transition-colors"
              >
                {/* Avatar circle */}
                <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center shadow-sm shadow-orange-200 flex-shrink-0">
                  <span className="text-xs font-bold text-white">{initials}</span>
                </div>
                <span className="hidden md:block text-sm font-semibold text-gray-800 max-w-[120px] truncate">
                  {displayName}
                </span>
                <ChevronDown className={`h-3.5 w-3.5 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <div className="absolute right-0 top-12 w-52 bg-white rounded-xl border border-gray-200 shadow-xl shadow-gray-200/60 py-1.5 z-50">
                  {/* User info */}
                  <div className="px-4 py-2.5 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-900 truncate">{displayName}</p>
                    {user.email && (
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">{user.email}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 text-gray-400" />
                      Dashboard
                    </Link>
                    <Link
                      href="/builder/new"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-4 w-4 text-gray-400" />
                      New Resume
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 py-1">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ---- LOGGED OUT ---- */
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors px-3 py-2"
              >
                Log In
              </Link>
              <Link
                href="/auth/register"
                className="text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full transition-colors shadow-lg shadow-orange-200"
              >
                Build My Resume
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
