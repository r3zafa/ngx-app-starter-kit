// theme.service.ts
import { Injectable, PLATFORM_ID, Signal, computed, inject, signal } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { THEME_VARIANTS, ThemeColorMode, ThemeVariant } from "../../types";

export const COLOR_MODE_KEY = 'color-mode';
export const THEME_VARIANTS_KEY = 'theme-variant';

export const COLOR_MODE: Record<ThemeColorMode, ThemeColorMode> = {
  dark: "dark",
  light: "light"
};


/**
 * Service for managing application theme (light/dark mode).
 *
 * Features:
 * - Toggles between light and dark themes.
 * - Sets and persists user theme preference in localStorage.
 * - Applies theme by updating the HTML element's color-scheme attribute and CSS classes.
 * - Listens for system color scheme changes and applies them if no user preference is set.
 * - Designed for Angular applications, supports both browser and server environments.
 * - Uses Angular dependency injection and PLATFORM_ID to ensure safe DOM access.
 * - Provided in root injector for global availability.
 */

@Injectable({
  providedIn: "root",
})
export class ThemeService {

  private platformId = inject(PLATFORM_ID);
  private readonly htmlElement: HTMLElement | null = null;

  // Signals
  private colorMode = signal<ThemeColorMode>(COLOR_MODE.light);
  private themeVariant = signal<ThemeVariant>(THEME_VARIANTS.twilightBlaze);

  // Computed theme
  public isDarkMode = computed(() => this.colorMode() === COLOR_MODE.dark);

  public activeTheme = computed(() => ({
    mode: this.colorMode(),
    variant: this.themeVariant(),
    classes: {
      mode: this.colorMode(),
      variant: this.themeVariant()
    }
  }));


  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.htmlElement = document.documentElement;
      this.initializeTheme();
    }
  }

  // - Initialize theme on app startup
  // - Initialize from storage or system preferences
  public initializeTheme() {
    const savedMode = this.getSavedColorMode() ?? this.getSystemColorMode();
    const savedVariant = this.getSavedVariant() ?? THEME_VARIANTS.twilightBlaze;
    this.setColorMode(savedMode);
    this.setThemeVariant(savedVariant);
    this.watchSystemColorMode();
  }

  // Color Mode Methods

  toggleColorMode(): ThemeColorMode {
    const newMode = this.colorMode() === COLOR_MODE.light ? COLOR_MODE.dark : COLOR_MODE.light;
    this.setColorMode(newMode);
    return newMode;
  }

  setColorMode(mode: ThemeColorMode): void {
    if (!this.htmlElement) return;
    // Update state
    this.colorMode.set(mode);
    localStorage.setItem(COLOR_MODE_KEY, mode);
    // Update DOM
    this.htmlElement.setAttribute('color-scheme', mode);
    this.htmlElement.classList.remove(COLOR_MODE.light, COLOR_MODE.dark);
    this.htmlElement.classList.add(mode);
  }

  // Theme Variant Methods

  setThemeVariant(variant: ThemeVariant): void {
    if (!this.htmlElement) return;
    // Update state
    this.themeVariant.set(variant);
    localStorage.setItem(THEME_VARIANTS_KEY, variant);
    // Update DOM
    Object.values(THEME_VARIANTS).forEach(v => this.htmlElement?.classList.remove(v));
    this.htmlElement?.classList.add(variant);
  }

  public cycleThemeVariant(): ThemeVariant {
    const variants = Object.values(THEME_VARIANTS);
    const nextVariant = variants[(variants.indexOf(this.themeVariant()) + 1) % variants.length];
    this.setThemeVariant(nextVariant);
    return nextVariant;
  }

  // private / helper methods
  private getSavedColorMode(): ThemeColorMode | null {
    const saved = localStorage.getItem(COLOR_MODE_KEY);
    return (saved === COLOR_MODE.light || saved === COLOR_MODE.dark) ? saved : null;
  }

  private getSavedVariant(): ThemeVariant | null {
    const saved = localStorage.getItem(THEME_VARIANTS_KEY);
    return Object.values(THEME_VARIANTS).includes(saved as ThemeVariant) ? saved as ThemeVariant : null;
  }

  private getSystemColorMode(): ThemeColorMode {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? COLOR_MODE.dark : COLOR_MODE.light;
  }

  private watchSystemColorMode(): void {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!this.getSavedColorMode()) this.setColorMode(e.matches ? COLOR_MODE.dark : COLOR_MODE.light);
    });
  }


}
