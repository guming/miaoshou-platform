import "@/styles/globals.css";
import "@/styles/prosemirror.css";
import "@/styles/ExcalidrawModal.css";
import "@/styles/snippet.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Providers from "./providers";

const title = "妙手";
const description = "Miaoshou - Simple and powerful notes for STEM";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@gumingcn",
  },
  metadataBase: new URL("https://miaoshou.dev"),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
