"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";
import { ToastProvider } from "@/components/ui/toast";

interface LayoutChildrenProps {
  children: React.ReactNode;
}

function AuthGuard({ children }: LayoutChildrenProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check auth cookie
    const checkAuthCookie = (): boolean => {
      if (typeof document === "undefined") return true;
      const cookies = document.cookie.split(";");
      return cookies.some((cookie) => cookie.trim().startsWith("sentri_auth="));
    };

    const isAuthenticated = checkAuthCookie();
    
    if (!isAuthenticated && !pathname.startsWith("/auth")) {
      localStorage.setItem("callback_url", pathname);
      router.replace(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    // Redirect authenticated users away from auth pages
    if (isAuthenticated && pathname.startsWith("/auth")) {
      const callbackUrl = localStorage.getItem("callback_url");
      router.replace(callbackUrl || "/dashboard/executive-summary");
      return;
    }

    setIsChecking(false);
  }, [router, pathname]);

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-canvas-dark">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-lime border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-dark-muted text-[14px]">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function ProtectedLayout({ children }: LayoutChildrenProps) {
  return (
    <AuthProvider>
      <AppProvider>
        <ToastProvider>
          <AuthGuard>{children}</AuthGuard>
        </ToastProvider>
      </AppProvider>
    </AuthProvider>
  );
}
