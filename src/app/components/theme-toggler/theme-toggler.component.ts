import {Component, inject, Signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from "@angular/material/tooltip";
import {matIconRecord, MatIconType, ThemeService} from '../../shared';

@Component({
    selector: 'theme-toggler',
    standalone: true,
    imports: [MatButtonModule, MatIcon, MatTooltip],
    templateUrl: './theme-toggler.component.html',
    styleUrls: ['./theme-toggler.component.scss']
})
export class ThemeTogglerComponent {
    private themeService: ThemeService = inject(ThemeService);

    readonly isDarkMode: Signal<boolean> = this.themeService.isDarkMode;
    readonly icon: Record<MatIconType, MatIconType> = matIconRecord;

    public toggleColorMode() {
        this.themeService.toggleColorMode();
    }
}
