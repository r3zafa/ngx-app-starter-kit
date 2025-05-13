import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpLoaderFactoryType } from "../types/http-loader-factory.type";
import { HttpClient } from "@angular/common/http";

export const httpLoaderFactory: HttpLoaderFactoryType = (http: HttpClient) =>
  new TranslateHttpLoader(http, "./i18n/", ".json");


