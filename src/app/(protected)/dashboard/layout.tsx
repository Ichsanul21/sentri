"use client";

import { Suspense } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { ToastProvider } from "@/components/ui/toast";
import { useFirstTimeFlow } from "@/hooks/use-first-time-flow";

function FirstTimeFlowGuard({ children }: { children: React.ReactNode }) {
  const { isChecking } = useFirstTimeFlow();
  
  if (isChecking) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-lime border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-dark-muted text-[14px]">Loading...</p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto scrollbar-thin p-6">
            <Suspense fallback={
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-accent-lime border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-on-dark-muted text-[14px]">Loading...</p>
                </div>
              </div>
            }>
              <FirstTimeFlowGuard>{children}</FirstTimeFlowGuard>
            </Suspense>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
