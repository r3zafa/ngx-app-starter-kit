import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { httpLoaderFactory } from "../helpers/http-loader-factory.helper";
import { HttpClient } from "@angular/common/http";

export const translationModuleProvider = [TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    })]