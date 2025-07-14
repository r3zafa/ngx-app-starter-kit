import { RouterOutlet } from '@angular/router';
import { Component, computed, ViewEncapsulation } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from "@angular/material/sidenav";
import { MatIcon } from '@angular/material/icon';
import { WithSidenavAndIcons } from '../../shared/classes/with-sidenav-and-icons';
import { ContentListComponent } from '../content-list/content-list.component';
import { SidenavExpandTogglerComponent } from '../sidenav-expand-toggler/sidenav-expand-toggler.component';
import { expandCollapseAnimation } from '../../shared/animation/expand-collapse.animation';

@Component({
  selector: "app-content",
  standalone: true,
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    expandCollapseAnimation
  ],
  imports: [
    TranslatePipe,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatButtonModule,
    RouterOutlet,
    MatIcon,
    ContentListComponent,
    SidenavExpandTogglerComponent
  ],
})
export class ContentComponent extends WithSidenavAndIcons {

  // computed
  protected pushReverseContentMargin = computed(() => this.opened() ? `-${this.contentMargin()}` : '0');
  protected pushContentMargin = computed(() => this.opened() ? this.contentMargin() : '0');

}
