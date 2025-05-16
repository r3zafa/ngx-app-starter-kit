import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TranslateService, TranslatePipe } from "@ngx-translate/core";
import { NavbarComponent } from "../components/navbar/navbar.component";
import { ContentComponent } from "../components/content/content.component";


@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [RouterOutlet, TranslatePipe, NavbarComponent, ContentComponent],
})
export class AppComponent {
  private translate: TranslateService = inject(TranslateService);

  constructor() {
    this.translate.addLangs(["de", "en"]);
    this.translate.setDefaultLang("en");
    this.translate.use("en");
  }

}
