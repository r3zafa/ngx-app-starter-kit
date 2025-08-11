import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection,} from "@angular/core";
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {provideHttpClient} from "@angular/common/http";
import {translationModuleProvider} from "./shared";
import {provideServiceWorker} from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({eventCoalescing: true}),
      provideHttpClient(),
      provideRouter(routes),
      importProvidersFrom(BrowserAnimationsModule),
      /* translations */
      importProvidersFrom(translationModuleProvider),
      /* PWA # only in none development builds */
      provideServiceWorker('ngsw-worker.js', {enabled: !isDevMode(), registrationStrategy: 'registerWhenStable:30000'}),
  ],
};
