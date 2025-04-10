import "@/styles/globals.css";
import "@/styles/prosemirror.css";
import "@/styles/text-editor.css";
import "@/styles/ExcalidrawModal.css";
import "katex/dist/katex.min.css";
import "@/styles/snippet.css";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-ui/styles/dark/attributes.css";
import "@liveblocks/react-tiptap/styles.css";

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import Providers from "./providers";

const title = "Miao Editor";
const description = "Simple and powerful editor for Stem";

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
    <html lang="en">
      <body>
        <Providers>
          <Suspense>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
