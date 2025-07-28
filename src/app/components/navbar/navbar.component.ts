import {Component, ViewEncapsulation} from "@angular/core";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {UI_TRANSLATION_Keys} from "../../shared";
import {
    NavbarLogoComponent,
    SidenavTogglerComponent,
    ThemeSelectorComponent,
    ThemeTogglerComponent,
    TranslationButtonComponent
} from "../index";

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
