import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { importProvidersFrom } from '@angular/core';

const config = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(MatSnackBarModule)
  ]
};

bootstrapApplication(AppComponent, config)
  .catch((err) => console.error(err));
