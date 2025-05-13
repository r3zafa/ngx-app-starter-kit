import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translation-button',
  standalone: true,
  imports: [],
  templateUrl: './translation-button.component.html',
  styleUrl: './translation-button.component.scss'
})
export class TranslationButtonComponent {
  private translate: TranslateService = inject(TranslateService);

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
