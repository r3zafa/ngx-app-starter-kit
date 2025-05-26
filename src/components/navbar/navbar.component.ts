import { MatIcon } from "@angular/material/icon";
import { Component, inject } from "@angular/core";
import { TranslationButtonComponent } from "../translation-button/translation-button.component";
import { ThemeTogglerComponent } from "../theme-toggler/theme-toggler.component";
import { MatToolbar } from "@angular/material/toolbar";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { SidenavService } from "../../shared/services/sidenav/sidenav.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  imports: [
    TranslationButtonComponent,
    ThemeTogglerComponent,
    MatToolbar,
    MatIcon,
    MatButton,
    MatButtonModule,
  ],
})
export class NavbarComponent {
  private SidenavService: SidenavService = inject(SidenavService);
  protected toggleSidenav = this.SidenavService.toggle.bind(this.SidenavService);
}
