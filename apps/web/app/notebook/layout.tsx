import "@/styles/globals.css";
import "@/styles/prosemirror.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MiaoShou",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}><Provider>{children}</Provider></body>
      </html>
    </ClerkProvider>
  );
}
