"use client";

import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import { Navigation } from "./_components/Navigation";
const Layout = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  return (
      <div className="h-full flex">
        <Navigation />
        <main className="flex-1 h-full overflow-y-auto">
          {children}
        </main>
        
      </div>
  );
};

export default Layout;