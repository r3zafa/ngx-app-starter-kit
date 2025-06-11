import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { HttpLoaderFactoryType } from "../index";

export const httpLoaderFactory: HttpLoaderFactoryType = (http: HttpClient) =>
  new TranslateHttpLoader(http, "./i18n/", ".json");


