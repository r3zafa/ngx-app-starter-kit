import { RouterOutlet } from '@angular/router';
import { SidenavService } from "../../shared/services/sidenav/sidenav.service";
import { Component, inject, signal } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSidenavModule } from "@angular/material/sidenav";

@Component({
  selector: "app-content",
  standalone: true,
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
  imports: [
    TranslatePipe,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    RouterOutlet
  ],
})
export class ContentComponent {
  private SidenavService: SidenavService = inject(SidenavService);

  protected opened = this.SidenavService.getOpened();
  protected mode = this.SidenavService.getMode();
  protected position = this.SidenavService.getPosition();
  protected hasBackdrop = this.SidenavService.getHasBackdrop();
  protected disableClose = this.SidenavService.getDisableClose();
  protected toggleSidenav = this.SidenavService.toggle;
}
