import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Cognition Labs Platform",
  description: "Abacus.ai-style AI/ML + LLM Ops platform"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0b1021] text-slate-100">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Topbar />
            <main className="px-8 pb-10 pt-6 space-y-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
