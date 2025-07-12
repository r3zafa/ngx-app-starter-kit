import { Component, ViewEncapsulation } from "@angular/core";
import { TranslationButtonComponent } from "../translation-button/translation-button.component";
import { ThemeTogglerComponent } from "../theme-toggler/theme-toggler.component";
import { MatToolbar } from "@angular/material/toolbar";
import { SidenavTogglerComponent } from "../sidenav-toggler/sidenav-toggler.component";

@Component({
  selector: "app-navbar",
  standalone: true,
  encapsulation:ViewEncapsulation.None,
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  imports: [
    MatToolbar,
    TranslationButtonComponent,
    ThemeTogglerComponent,
    SidenavTogglerComponent,
  ],
})
export class NavbarComponent {

}
