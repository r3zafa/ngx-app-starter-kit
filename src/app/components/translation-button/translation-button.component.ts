import {Component, inject} from "@angular/core";
import {UpperCasePipe} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatPseudoCheckboxModule} from "@angular/material/core";
import {matIconRecord, MatIconType} from "../../shared";

@Component({
    selector: "translation-button",
    standalone: true,
    templateUrl: "./translation-button.component.html",
    styleUrls: ["./translation-button.component.scss"],
    imports: [
        MatButtonModule,
        MatIcon,
        UpperCasePipe,
        MatMenuModule,
        MatMenuItem,
        MatSelectModule,
        MatPseudoCheckboxModule,
        MatTooltip
    ],
})
export class TranslationButtonComponent {
    private translate: TranslateService = inject(TranslateService);

    readonly icon: Record<MatIconType, MatIconType> = matIconRecord;
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
