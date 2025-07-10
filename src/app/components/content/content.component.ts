import { RouterOutlet } from '@angular/router';
import { SidenavService } from "../../shared/services/sidenav/sidenav.service";
import { Component, computed, inject } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from "@angular/material/sidenav";
import { matIconRecord } from '../../shared/constants/mat-icon-record.constant';
import { MatIcon } from '@angular/material/icon';
import { MatIconType } from '../../shared/types/mat-icon.type';

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
  ],
})
export class ContentComponent {
  // Importing the matIconRecord constant to use in the template
  public icon: Record<MatIconType, MatIconType> = matIconRecord;
  // Injecting the SidenavService to manage the sidenav state
  private sidenavService: SidenavService = inject(SidenavService);
  // Using signals to manage the state of the sidenav
  protected opened = this.sidenavService.getOpened();
  protected mode = this.sidenavService.getMode();
  protected position = this.sidenavService.getPosition();
  protected hasBackdrop = this.sidenavService.getHasBackdrop();
  protected disableClose = this.sidenavService.getDisableClose();
  protected width = this.sidenavService.getWidth();
  protected contentMargin = this.sidenavService.getContentMargin();
  protected isColapsed = this.sidenavService.getIsColapsed();

  // methods
  protected toggleIsColapsed(): void {
    this.sidenavService.setIsColapsed(!this.isColapsed());
  }

  // computed
  protected pushReverseContentMargin = computed(() => this.opened() ? `-${this.contentMargin()}` : '0');
  protected pushContentMargin = computed(() => this.opened() ? this.contentMargin() : '0');

}
