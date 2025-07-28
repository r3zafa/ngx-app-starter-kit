export type ThemeColorMode = "light" | "dark";
export type ThemeVariantRecord = Record<'jadeSerenity' | 'twilightBlaze', "jade-serenity" | "twilight-blaze">

export const THEME_VARIANTS: ThemeVariantRecord = {
    jadeSerenity: "jade-serenity",
    twilightBlaze: "twilight-blaze"
} as const;

export type ThemeVariant = typeof THEME_VARIANTS[keyof typeof THEME_VARIANTS];
export type ThemeVariantKey = keyof typeof THEME_VARIANTS;