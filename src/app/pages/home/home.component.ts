import { Component } from "@angular/core";
import { UI_TRANSLATION_Keys } from "../../shared/constants";
import { TranslatePipe } from "@ngx-translate/core";

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
