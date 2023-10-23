"use client";

import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type IconPickerProps = {
  onChange: (icon: string) => void;
  asChild?: boolean;
  children: React.ReactNode;
};
const IconPicker = ({ onChange, asChild, children }: IconPickerProps) => {
  const { resolvedTheme } = useTheme(); // resolved gets either "dark" or "light" without "system"

  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  //  casting the type that matches to Emoji Picker prop value
  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const theme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker
          onEmojiClick={(data) => onChange(data.emoji)}
          height={350}
          width={300}
          theme={theme}
          lazyLoadEmojis={true}
          previewConfig={{ showPreview: false }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
