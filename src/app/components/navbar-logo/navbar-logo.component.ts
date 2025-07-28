import {Component, computed, inject, Signal} from '@angular/core';
import {COLORS, ThemeService} from '../../shared/';

@Component({
    selector: 'app-navbar-logo',
    standalone: true,
    imports: [],
    templateUrl: './navbar-logo.component.html',
    styleUrl: './navbar-logo.component.scss'
})
export class NavbarLogoComponent {
    private themeService = inject(ThemeService);

    readonly isDarkMode: Signal<boolean> = this.themeService.isDarkMode;

    spaceShipBodyColor = computed(() => this.isDarkMode() ? COLORS.ERROR_100 : COLORS.ERROR_100);
    spaceShipFireColor = computed(() => this.isDarkMode() ? COLORS.ERROR_100 : COLORS.ERROR_100);

}
