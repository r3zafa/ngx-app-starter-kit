import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from "@angular/material/tooltip";
import {WithSidenavAndIcons} from "../../shared";

@Component({
    selector: 'sidenav-toggler',
    standalone: true,
    imports: [MatButtonModule, MatIcon, MatTooltip],
    templateUrl: 'sidenav-toggler.component.html',
    styleUrl: 'sidenav-toggler.component.scss'
})
// Make sure to import or define WithSidenavAndIcons above this line
export class SidenavTogglerComponent extends WithSidenavAndIcons {

    toggleSidenav(): void {
        this.sidenavService.toggle();
    }

    readonly sidenavState = this.sidenavService.getOpened();
}
