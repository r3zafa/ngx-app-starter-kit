// theme.service.ts
import { Injectable, PLATFORM_ID, inject, signal } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

type ThemeType = "light" | "dark";

const THEME_KEY = "theme-preference";

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
  // dependency injection
  private platformId: Object = inject(PLATFORM_ID);

  // HTML element to set color-scheme
  private readonly _htmlElement?: HTMLHtmlElement;

  // Signal to track the current theme
  private currentThemeSignal = signal<ThemeType>("light");

  constructor() {
    // ensure we only access document/window in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this._htmlElement = document.documentElement as HTMLHtmlElement;
      this.currentThemeSignal.set(this.getSavedTheme() || this.getSystemTheme());
    }
  }

  // Initialize theme on app startup
  public initializeTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    const savedTheme = this.getSavedTheme();
    const systemTheme = this.getSystemTheme();

    // Prefer saved theme, fall back to system theme
    const initialTheme = systemTheme || savedTheme;
    this.setTheme(initialTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", (e) => !this.getSavedTheme() ? this.setTheme(e.matches ? "dark" : "light") : null);
  }

  /**
   * Toggle between light and dark themes
   */
  public toggleTheme(): ThemeType | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const currentTheme = this.currentThemeSignal();
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
    return newTheme;
  }

  /**
   * Set a specific theme.
   * @param theme 'light' or 'dark'.
   */
  public setTheme(theme: ThemeType) {
    if (!isPlatformBrowser(this.platformId)) return;
    console.log("Setting theme:", theme);
    localStorage.setItem(THEME_KEY, theme); // Save theme preference
    this._htmlElement?.setAttribute("color-scheme", theme); // Set color-scheme on html element
    // Toggle theme-specific classes
    if (theme === "dark") {
      console.log("Adding dark-theme class");
      this._htmlElement?.classList.add("dark-theme");
      this._htmlElement?.classList.remove("light-theme");
    } else {
      console.log("Adding light-theme class");
      this._htmlElement?.classList.add("light-theme");
      this._htmlElement?.classList.remove("dark-theme");
    }
    this.currentThemeSignal.set(theme); // Update the signal
  }

  /**
   * Get the current active theme as a signal
   * @returns Signal of 'light' or 'dark'.
   */
  public getCurrentTheme() {
    return this.currentThemeSignal.asReadonly();
  }

  private getSystemTheme(): ThemeType {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  /**
   * Get saved theme preference from localStorage
   * @returns Saved theme or null.
   */
  private getSavedTheme(): ThemeType | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    const savedTheme = localStorage.getItem(THEME_KEY);
    return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
  }

  /**
   * Set theme based on system preference
   */
  public setThemeFromSystemPreference() {
    if (!isPlatformBrowser(this.platformId)) return;
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const initialTheme = prefersDarkScheme.matches ? "dark" : "light";
    this.setTheme(initialTheme);

    // Use addEventListener instead of deprecated addListener
    prefersDarkScheme.addEventListener("change", (e) => {
      // Only change if no saved preference exists
      if (!this.getSavedTheme()) {
        this.setTheme(e.matches ? "dark" : "light");
      }
    });
  }
}
