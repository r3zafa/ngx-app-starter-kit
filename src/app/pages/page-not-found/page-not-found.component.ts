import {Component, computed, inject, Signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Location} from '@angular/common';
import {LayoutService, matIconRecord, MatIconType, ThemeColorMode, ThemeService} from '../../shared/';
import {Err404DesktopComponent, Err404MobileComponent} from './components';

@Component({
    selector: 'app-page-not-found',
    standalone: true,
    imports: [Err404DesktopComponent, Err404MobileComponent, MatButton, MatIcon],
    templateUrl: './page-not-found.component.html',
    styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

    // constants
    public icon: Record<MatIconType, MatIconType> = matIconRecord;

    // injects
    private layoutService = inject(LayoutService);
    private themeService = inject(ThemeService);
    private location = inject(Location);

    readonly colorMode: Signal<ThemeColorMode> = computed(() => this.themeService.activeTheme().mode);
    readonly isMobile404 = this.layoutService.isPortrait;  // 404 layout


    goBack = () => this.location.back();

}