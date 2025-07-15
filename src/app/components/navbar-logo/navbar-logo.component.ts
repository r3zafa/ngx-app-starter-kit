import { Component, computed, inject, Signal } from '@angular/core';
import { COLORS } from '../../shared/constants';
import { ThemeType } from '../../shared/types';
import { ThemeService } from '../../shared/services';

@Component({
  selector: 'app-navbar-logo',
  standalone: true,
  imports: [],
  templateUrl: './navbar-logo.component.html',
  styleUrl: './navbar-logo.component.scss'
})
export class NavbarLogoComponent {
  private themeService = inject(ThemeService);
  readonly currentTheme: Signal<ThemeType> = this.themeService.getCurrentTheme();  // theme state


  spaceShipBodyColor = computed(()=> this.currentTheme() === 'dark' ? COLORS.ERROR_100 : COLORS.ERROR_100);
  spaceShipFireColor = computed(()=> this.currentTheme() === 'dark' ? COLORS.ERROR_100 : COLORS.ERROR_100);
  
}
