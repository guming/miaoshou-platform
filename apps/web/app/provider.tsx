"use client";
import { useAuth } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { ReactNode } from "react";
const queryClient = new QueryClient();

export default function Provider({ children }: { children: ReactNode }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConvexProviderWithClerk>
  );
}
