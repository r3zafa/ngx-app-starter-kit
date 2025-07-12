import { Component, ViewEncapsulation } from '@angular/core';
import { WithSidenavAndIcons } from '../../shared/classes/with-sidenav-and-icons';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-sidenav-expand-toggler',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [MatIcon, MatMiniFabButton],
  templateUrl: './sidenav-expand-toggler.component.html',
  styleUrl: './sidenav-expand-toggler.component.scss',
  host:{
    class: 'sidenav-expand-toggler'
  }
})
export class SidenavExpandTogglerComponent extends WithSidenavAndIcons {

    // methods
  protected toggleIsColapsed(): void {
    this.sidenavService.setIsCollapsed(!this.isCollapsed());
  }

}
