"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";
import { ToastProvider } from "@/components/ui/toast";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AppProvider>
    </AuthProvider>
  );
}
