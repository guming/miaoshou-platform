"use client";
import { type Dispatch, type ReactNode, type SetStateAction, createContext } from "react";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import useLocalStorage from "@/hooks/use-local-storage";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export const AppContext = createContext<{
  font: string;
  setFont: Dispatch<SetStateAction<string>>;
}>({
  font: "Default",
  setFont: () => {},
});

const ToasterProvider = () => {
  const { theme } = useTheme() as {
    theme: "light" | "dark" | "system";
  };
  return <Toaster theme={theme} />;
};

export default function Provider({ children }: { children: ReactNode }) {
  const [font, setFont] = useLocalStorage<string>("novel__font", "Default");
  return (
    <ThemeProvider attribute="class" enableSystem disableTransitionOnChange defaultTheme="system">
      <AppContext.Provider
        value={{
          font,
          setFont,
        }}
      >
        <ToasterProvider />
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </AppContext.Provider>
    </ThemeProvider>
  );
}
