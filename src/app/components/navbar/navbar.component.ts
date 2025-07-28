import {Component, ViewEncapsulation} from "@angular/core";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {UI_TRANSLATION_Keys} from "../../shared";
import {TranslationButtonComponent} from "../translation-button/translation-button.component";
import {ThemeTogglerComponent} from "../theme-toggler/theme-toggler.component";
import {SidenavTogglerComponent} from "../sidenav-toggler/sidenav-toggler.component";
import {NavbarLogoComponent} from "../navbar-logo/navbar-logo.component";
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
