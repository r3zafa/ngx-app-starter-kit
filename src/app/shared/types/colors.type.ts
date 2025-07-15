//
export type ColorShade = 0 | 10 | 20 | 25 | 30 | 35 | 40 | 50 | 60 | 70 | 80 | 90 | 95 | 98 | 99 | 100;
export type ColorShadeNeutral = ColorShade | 4 | 6 | 12 | 17 | 22 | 24 | 87 | 92 | 94 | 96;

export type PrimaryColors = `PRIMARY_${ColorShade}`;
export type SecondaryColors = `SECONDARY_${ColorShade}`;
export type TertiaryColors = `TERTIARY_${ColorShade}`;
export type NeutralColors = `NEUTRAL_${ColorShadeNeutral}`;
export type NeutralVariantColors = `NEUTRAL_VARIANT_${ColorShade}`;
export type ErrorColors = `ERROR_${ColorShade}`;
//
export type PalettesKey = 'LIGHT' | 'DARK' | PrimaryColors | SecondaryColors | TertiaryColors | NeutralColors | NeutralVariantColors | ErrorColors;
//
export type Colors = Record<PalettesKey, string>;