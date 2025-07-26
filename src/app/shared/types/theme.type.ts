export type ThemeColorMode = "light" | "dark";

// types.ts
export const THEME_VARIANTS = {
  jadeSerenity: "jade-serenity",
  twilightBlaze: "twilight-blaze"
} as const;

export type ThemeVariant = typeof THEME_VARIANTS[keyof typeof THEME_VARIANTS];
export type ThemeVariantKey = keyof typeof THEME_VARIANTS;