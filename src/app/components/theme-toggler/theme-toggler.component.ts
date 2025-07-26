import { Component, inject, effect, Signal } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ThemeService, ThemeVariant } from '../../shared';

@Component({
  selector: 'theme-toggler',
  standalone: true,
  imports: [MatButtonModule, MatIcon],
  templateUrl: './theme-toggler.component.html',
  styleUrls: ['./theme-toggler.component.scss']
})
export class ThemeTogglerComponent {
  private themeService: ThemeService = inject(ThemeService);

  readonly isDarkMode: Signal<boolean> = this.themeService.isDarkMode;

  public toggleColorMode() {
    this.themeService.toggleColorMode();
  }

  public selectThemeVariant(variant: ThemeVariant) {
    this.themeService.setThemeVariant(variant);
  }

  public cycleThemeVariant() {
    this.themeService.cycleThemeVariant();
  }
}
