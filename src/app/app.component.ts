import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TranslateService, TranslatePipe } from "@ngx-translate/core";
import { NavbarComponent } from "../components/navbar/navbar.component";
@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [RouterOutlet, TranslatePipe, NavbarComponent],
})
export class AppComponent {
  private translate: TranslateService = inject(TranslateService);

  constructor() {
    this.translate.addLangs(["de", "en"]);
    this.translate.setDefaultLang("en");
    this.translate.use("en");
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
