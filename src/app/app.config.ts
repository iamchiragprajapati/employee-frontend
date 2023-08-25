import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TitleStrategy, provideRouter, withComponentInputBinding } from '@angular/router';
import { mockServiceProvider } from '@constants/app.provide';
import { appRoutes } from '@constants/app.routes';
import { HttpErrorInterceptor, HttpTokenInterceptor } from '@interceptors/http.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomPageTitleStrategy } from '@services/custom-page-title-strategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([HttpTokenInterceptor, HttpErrorInterceptor])),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
        }
      }),
      MatSnackBarModule,
      MatDialogModule
    ),
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    { provide: LOCALE_ID, useValue: 'en-us' },
    { provide: TitleStrategy, useClass: CustomPageTitleStrategy },
    ...mockServiceProvider
  ]
};

export function getLocalStorage() {
  return typeof window !== 'undefined' ? window.localStorage : null;
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
