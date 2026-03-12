import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { NavbarWrapper } from '@/components/navbar-wrapper';

export async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <NavbarWrapper>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center transition-all duration-300 group-hover:bg-orange-400 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-orange-200">
            <FileText className="h-4 w-4 text-white transition-transform duration-300" />
          </div>
          <span className="text-lg font-bold text-gray-900">ResumeForge</span>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-600 border border-orange-200 hidden sm:inline">
            BETA
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm text-gray-500 hidden sm:block truncate max-w-[180px]">
                {user.email}
              </span>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                  Dashboard
                </Button>
              </Link>
              <form action="/auth/signout" method="post">
                <Button variant="outline" size="sm" type="submit" className="border-gray-300 text-gray-500 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 transition-colors bg-transparent">
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-400 text-white border-0 shadow-lg shadow-orange-200 hover:-translate-y-0.5 transition-all duration-200 btn-shimmer">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </NavbarWrapper>
  );
}

