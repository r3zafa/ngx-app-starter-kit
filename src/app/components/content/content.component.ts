import { RouterOutlet } from '@angular/router';
import { Component, computed, inject } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from "@angular/material/sidenav";
import { MatIcon } from '@angular/material/icon';
import { WithSidenavAndIcons } from '../../shared/classes/with-sidenav-and-icons';
import { ContentListComponent } from '../content-list/content-list.component';

@Component({
  selector: "app-content",
  standalone: true,
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
  imports: [
    TranslatePipe,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatButtonModule,
    RouterOutlet,
    MatIcon,
    ContentListComponent
  ],
})
export class ContentComponent extends WithSidenavAndIcons {

  // methods
  protected toggleIsColapsed(): void {
    this.sidenavService.setIsColapsed(!this.isColapsed());
  }

  // computed
  protected pushReverseContentMargin = computed(() => this.opened() ? `-${this.contentMargin()}` : '0');
  protected pushContentMargin = computed(() => this.opened() ? this.contentMargin() : '0');

}
