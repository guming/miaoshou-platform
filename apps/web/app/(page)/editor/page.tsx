"use client";

import { Avatars } from "@/components/avatars";
import { DocumentSpinner } from "@/components/spinner";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import { ThemeToggle } from "@/components/theme-toggle";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import Script from "next/script";
import { Room } from "./room";

export default function Page() {
  return (
    <Room>
      <div className="flex flex-col bg-border/30 absolute inset-0">
        <Script
          src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"
          strategy="beforeInteractive"
        />
        <Script src="https://unpkg.com/@antonz/runno@0.6.1/dist/runno.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/@antonz/codapi@0.19.10/dist/engine/wasi.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/@antonz/codapi@0.19.10/dist/snippet.js" strategy="lazyOnload" />
        <Script src="https:////unpkg.com/mathlive" strategy="lazyOnload" />
        <Script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/d3@7" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6" strategy="beforeInteractive" />
        <div className="top-0 left-0 right-0 flex flex-none justify-between items-start bg-background border-b border-border p-1.5 z-10">
          <ThemeToggle />
          <ClientSideSuspense fallback={null}>
            <Avatars />
          </ClientSideSuspense>
        </div>
        <div className="flex-1 overflow-y-scroll">
          <div className="min-h-0 h-auto mx-auto px-4">
            <div className="relative min-h-[1100px] w-full max-w-[800px] my-4 mx-auto border border-border bg-background">
              <ClientSideSuspense fallback={<DocumentSpinner />}>
                <TailwindAdvancedEditor />
              </ClientSideSuspense>
            </div>
          </div>
        </div>
      </div>
    </Room>
  );
}
