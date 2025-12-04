(window as any).__zone_symbol__skipSpecialEventCoercion = true;
(window as any).__zone_symbol__ignoreChromePrivateApi = true;
(window as any).__zone_symbol__ignoreConsoleErrorUncaughtError = true;

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

registerLocaleData(localePt);

bootstrapApplication(AppComponent, {
  ...appConfig,
});
