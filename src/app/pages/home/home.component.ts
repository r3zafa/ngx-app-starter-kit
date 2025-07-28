import {Component} from "@angular/core";
import {TranslatePipe} from "@ngx-translate/core";
import {UI_TRANSLATION_Keys} from "../../shared/";

@Component({
    selector: "app-home",
    standalone: true,
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
    imports: [TranslatePipe],
})
export class HomeComponent {
    public translations = UI_TRANSLATION_Keys;
}
