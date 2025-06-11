import { Component, inject } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenuItem, MatMenuModule } from "@angular/material/menu";
import { UpperCasePipe } from "@angular/common";
import { MatPseudoCheckboxModule } from "@angular/material/core";

@Component({
  selector: "translation-button",
  standalone: true,
  templateUrl: "./translation-button.component.html",
  styleUrls: ["./translation-button.component.scss"],
  imports: [
    MatSelect, 
    MatButtonModule, 
    MatIcon, 
    UpperCasePipe, 
    MatMenuModule,
    MatMenuItem,
    MatSelectModule,
    MatPseudoCheckboxModule
  ],
})
export class TranslationButtonComponent {
  private translate: TranslateService = inject(TranslateService);

  protected languages: string[] = ["en", "de"];
  protected selectedLanguage: string = "en"; // Default language

  constructor() {
    this.selectedLanguage = this.translate.currentLang || "en"; // Initialize with current language
  }

  switchLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.translate.use(lang);
  }
}
