import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

export type HttpLoaderFactoryType = (http: HttpClient) => TranslateHttpLoader;
