import {Component, ViewEncapsulation} from "@angular/core";
import {TranslationButtonComponent} from "../translation-button/translation-button.component";
import {ThemeTogglerComponent} from "../theme-toggler/theme-toggler.component";
import {MatToolbar} from "@angular/material/toolbar";
import {SidenavTogglerComponent} from "../sidenav-toggler/sidenav-toggler.component";
import {UI_TRANSLATION_Keys} from "../../shared";
import {MatButton} from "@angular/material/button";
import {NavbarLogoComponent} from "../navbar-logo/navbar-logo.component";
import {RouterLink} from "@angular/router";
import {ThemeSelectorComponent} from "../theme-selector/theme-selector.component";

@Component({
    selector: "app-navbar",
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"],
    imports: [
        MatToolbar,
        MatButton,
        TranslationButtonComponent,
        ThemeTogglerComponent,
        SidenavTogglerComponent,
        NavbarLogoComponent,
        RouterLink,
        ThemeSelectorComponent
    ],
})
export class NavbarComponent {
    public translations = UI_TRANSLATION_Keys;
}
