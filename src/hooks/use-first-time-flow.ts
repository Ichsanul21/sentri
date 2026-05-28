"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useApp } from "@/contexts/AppContext";

export function useFirstTimeFlow() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();
  const { brands } = useApp();
  const [isChecking, setIsChecking] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // Skip redirect check for auth routes and admin pages
    const isAuthRoute = pathname.startsWith("/auth");
    const isAdminRoute = pathname.startsWith("/admin");
    
    if (isAuthRoute || isAdminRoute) {
      setIsChecking(false);
      return;
    }

    // Check if user needs to complete brand setup
    if (brands.length === 0 && !pathname.includes("/dashboard/brands/setup")) {
      setShouldRedirect(true);
    } else {
      setShouldRedirect(false);
    }

    setIsChecking(false);
  }, [isAuthenticated, user, brands, pathname]);

  useEffect(() => {
    if (shouldRedirect) {
      router.replace("/dashboard/brands/setup?onboarding=true");
    }
  }, [shouldRedirect, router]);

  return { isChecking, shouldRedirect };
}
