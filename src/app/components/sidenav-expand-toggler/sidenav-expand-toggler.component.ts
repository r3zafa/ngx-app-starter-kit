import {Component, HostBinding, ViewEncapsulation} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import {MatTooltip} from "@angular/material/tooltip";
import {WithSidenavAndIcons} from "../../shared";

@Component({
    selector: 'app-sidenav-expand-toggler',
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [MatIcon, MatMiniFabButton, MatTooltip],
    templateUrl: './sidenav-expand-toggler.component.html',
    styleUrl: './sidenav-expand-toggler.component.scss',
    host: {
        class: 'sidenav-expand-toggler'
    }
})
export class SidenavExpandTogglerComponent extends WithSidenavAndIcons {

    @HostBinding('class.collapsed') get collapsedClass() {
        return this.isCollapsed();
    }


    // methods
    protected toggleIsColapsed(): void {
        this.sidenavService.setIsCollapsed(!this.isCollapsed());
    }

}
