"use client";
import { LiveblocksProvider } from "@liveblocks/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      // Get users' info from their ID
      resolveUsers={async ({ userIds }) => {
        const searchParams = new URLSearchParams(userIds.map((userId) => ["userIds", userId]));
        const response = await fetch(`/api/users?${searchParams}`);

        if (!response.ok) {
          throw new Error("Problem resolving users");
        }

        const users = await response.json();
        return users;
      }}
      // Find a list of users that match the current search term
      resolveMentionSuggestions={async ({ text }) => {
        const response = await fetch(`/api/users/search?text=${encodeURIComponent(text)}`);

        if (!response.ok) {
          throw new Error("Problem resolving mention suggestions");
        }

        const userIds = await response.json();
        return userIds;
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </LiveblocksProvider>
  );
}
