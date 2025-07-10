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
  private sns: SidenavService = inject(SidenavService);

  // Using signals to manage the state of the sidenav
  protected opened = this.sns.getOpened();
  protected mode = this.sns.getMode();
  protected position = this.sns.getPosition();
  protected hasBackdrop = this.sns.getHasBackdrop();
  protected disableClose = this.sns.getDisableClose();
  protected width = this.sns.getWidth();
  protected isColapsed = this.sns.getIsColapsed();

  // setter
  protected toggleIsColapsed(): void {
    this.sns.setIsColapsed(!this.isColapsed());
  }

}
