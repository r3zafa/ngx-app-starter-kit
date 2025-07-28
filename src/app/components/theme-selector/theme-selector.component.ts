import {Component, computed, inject, Signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatTooltip} from "@angular/material/tooltip";
import {NgClass} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {
    COLOR_MODE,
    matIconRecord,
    MatIconType,
    THEME_VARIANTS,
    ThemeColorMode,
    ThemeService,
    ThemeVariant,
    ThemeVariantRecord
} from "../../shared";

type IndicatorModeKeys = 'darkTwilightBlaze' | 'lightTwilightBlaze' | 'darkJadeSerenity' | 'lightJadeSerenity';
type IndicatorModeValues = 1 | 2 | 3 | 4;

@Component({
    selector: 'theme-selector',
    standalone: true,
    imports: [
        MatIcon,
        MatIconButton,
        MatMenu,
        MatMenuItem,
        MatMenuTrigger,
        MatTooltip,
        NgClass,
        MatDivider
    ],
    templateUrl: './theme-selector.component.html',
    styleUrl: './theme-selector.component.scss'
})
export class ThemeSelectorComponent {
    private themeService: ThemeService = inject(ThemeService);

    readonly icon: Record<MatIconType, MatIconType> = matIconRecord;
    readonly mode: Record<ThemeColorMode, ThemeColorMode> = COLOR_MODE;
    readonly variant: ThemeVariantRecord = THEME_VARIANTS;
    readonly INDICATOR_MODE: Record<IndicatorModeKeys, IndicatorModeValues> = {
        'darkTwilightBlaze': 1,
        'darkJadeSerenity': 2,
        'lightTwilightBlaze': 3,
        'lightJadeSerenity': 4
    }

    darkJs: [ThemeVariant, ThemeColorMode] = [this.variant.jadeSerenity, this.mode.dark];
    lightJs: [ThemeVariant, ThemeColorMode] = [this.variant.jadeSerenity, this.mode.light];
    darkTb: [ThemeVariant, ThemeColorMode] = [this.variant.twilightBlaze, this.mode.dark];
    lightTb: [ThemeVariant, ThemeColorMode] = [this.variant.twilightBlaze, this.mode.light];

    public selectThemeVariant(state: [ThemeVariant, ThemeColorMode]): void {
        this.themeService.setThemeVariant(state[0]);
        this.themeService.setColorMode(state[1]);
    }

    selection: Signal<number> = computed((): number => {
        const {mode, variant} = this.themeService.activeTheme();
        const themeMap = {
            'dark': {'twilight-blaze': 1, 'jade-serenity': 2},  // 1=darkTwilightBlaze, 2=darkJadeSerenity
            'light': {'twilight-blaze': 3, 'jade-serenity': 4}  // 3=lightTwilightBlaze, 4=lightJadeSerenity
        };
        return themeMap[mode]?.[variant] ?? null;
    });


    stringFormat(str: string): string {
        return str
            .replace('-', ' ')
            .replace(/^\w/, (firstChar) => firstChar.toUpperCase());
    }

}
