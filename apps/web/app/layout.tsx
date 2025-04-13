import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Provider from "./provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://miaoshou.dev/"),
  title: {
    default: "Miao Platform",
    template: `%s | Miao Platform`,
  },
  description: "",
  openGraph: {
    description: "",
    images: ["https://dwdwn8b5ye.ufs.sh/f/MD2AM9SEY8GucGJl7b5qyE7FjNDKYduLOG2QHWh3f5RgSi0c"],
    url: "https://miaoshou.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "miaoshou platform",
    description: "",
    siteId: "",
    creator: "@rasmickyy",
    creatorId: "",
    images: ["https://dwdwn8b5ye.ufs.sh/f/MD2AM9SEY8GucGJl7b5qyE7FjNDKYduLOG2QHWh3f5RgSi0c"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <html lang="en" suppressHydrationWarning>
        <body className={GeistSans.className}>
          <Provider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
              {children}
              <Toaster />
            </ThemeProvider>
          </Provider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
