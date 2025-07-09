import { RouterOutlet } from '@angular/router';
import { SidenavService } from "../../shared/services/sidenav/sidenav.service";
import { Component, inject } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { MatButtonModule} from "@angular/material/button";
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
  public icon: Record<MatIconType, MatIconType>  = matIconRecord;

  // Injecting the SidenavService to manage the sidenav state
  private SidenavService: SidenavService = inject(SidenavService);

  // Using signals to manage the state of the sidenav
  protected opened = this.SidenavService.getOpened();
  protected mode = this.SidenavService.getMode();
  protected position = this.SidenavService.getPosition();
  protected hasBackdrop = this.SidenavService.getHasBackdrop();
  protected disableClose = this.SidenavService.getDisableClose();
  protected width = this.SidenavService.getWidth();
  protected isColapsed = this.SidenavService.getIsColapsed();

  // setter
  protected toggleIsColapsed(): void {
    this.SidenavService.setIsColapsed(!this.isColapsed());
  }


}
