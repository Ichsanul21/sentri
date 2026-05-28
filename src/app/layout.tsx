import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Sentri — Brand Sentiment Platform",
  description: "Enterprise Brand Sentiment & Social Listening Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${rubik.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="h-full font-sans bg-surface-canvas-dark text-on-primary transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
