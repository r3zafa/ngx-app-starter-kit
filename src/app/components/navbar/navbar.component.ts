import { Component, ViewEncapsulation } from "@angular/core";
import { TranslationButtonComponent } from "../translation-button/translation-button.component";
import { ThemeTogglerComponent } from "../theme-toggler/theme-toggler.component";
import { MatToolbar } from "@angular/material/toolbar";
import { SidenavTogglerComponent } from "../sidenav-toggler/sidenav-toggler.component";
import { TranslatePipe } from "@ngx-translate/core";
import { UI_TRANSLATION_Keys } from "../../shared/constants";
import { MatButton } from "@angular/material/button";
import { NavbarLogoComponent } from "../navbar-logo/navbar-logo.component";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-navbar",
  standalone: true,
  encapsulation:ViewEncapsulation.None,
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  imports: [
    MatToolbar,
    TranslatePipe,
    MatButton,
    MatIcon,
    TranslationButtonComponent,
    ThemeTogglerComponent,
    SidenavTogglerComponent,
    NavbarLogoComponent,
    RouterLink
  ],
})
export class NavbarComponent {
  public translations = UI_TRANSLATION_Keys;
}
