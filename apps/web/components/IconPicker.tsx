"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { ReactNode } from "react";
import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type TIconPicker = {
  onChange: (icon: string) => void;
  children: ReactNode;
  asChild?: boolean;
};

const IconPicker = ({ children, onChange, asChild }: TIconPicker) => {
  const { resolvedTheme } = useTheme();
  const currTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const theme = themeMap[currTheme];

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker
          height={350}
          theme={theme}
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
