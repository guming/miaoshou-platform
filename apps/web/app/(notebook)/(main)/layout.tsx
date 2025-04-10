"use client";
import type React from "react";
import { Navigation } from "./_components/Navigation";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto">{children}</main>
    </div>
  );
}
