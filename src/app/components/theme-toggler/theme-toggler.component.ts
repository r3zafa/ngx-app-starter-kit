import { Component, inject, effect } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ThemeService } from '../../shared';

@Component({
  selector: 'theme-toggler',
  standalone: true,
  imports: [MatButtonModule, MatIcon],
  templateUrl: './theme-toggler.component.html',
  styleUrls: ['./theme-toggler.component.scss']
})
export class ThemeTogglerComponent {
  private themeService: ThemeService = inject(ThemeService);

  isDarkMode: boolean = false;

  constructor() {
    this.themeService.initializeTheme();

    // Reactively update `isDarkMode` when the theme signal changes
    effect(() => {
      this.isDarkMode = this.themeService.getCurrentTheme()() === 'dark';
    });
  }

  public toggleTheme() {
    this.themeService.toggleTheme();
  }
}
