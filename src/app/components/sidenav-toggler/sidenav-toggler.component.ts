import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { WithSidenavAndIcons } from '../../shared/classes/with-sidenav-and-icons';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'sidenav-toggler',
  standalone: true,
  imports: [MatButtonModule,MatIcon],
  templateUrl: 'sidenav-toggler.component.html',
  styleUrl: 'sidenav-toggler.component.scss'
})
// Make sure to import or define WithSidenavAndIcons above this line
export class SidenavTogglerComponent extends WithSidenavAndIcons {

  toggleSidenav(): void {
    this.sidenavService.toggle();
  }

}
