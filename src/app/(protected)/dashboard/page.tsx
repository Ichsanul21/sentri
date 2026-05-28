"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login?callbackUrl=/dashboard");
      return;
    }
    router.replace("/dashboard/executive-summary");
  }, [isAuthenticated, router]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-accent-lime border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-on-dark-muted text-[14px]">Loading dashboard...</p>
      </div>
    </div>
  );
}
