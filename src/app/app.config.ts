import { importProvidersFrom } from '@angular/core';
import { ApplicationConfig } from '@angular/platform-browser';
import { TitleStrategy, provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { APP_ROUTES } from './app.routes';
import { entityConfig } from './entity-metadata';
import { environment } from 'src/environments/environment';
import { CustomTitleStrategyService } from './services/custom-title-strategy.service';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:3000',
  timeout: 3000, // request timeout
};

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      EntityDataModule.forRoot(entityConfig),
      StoreDevtoolsModule.instrument({
        maxAge: 5,
        logOnly: environment.production,
      })
    ),
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    { provide: TitleStrategy, useClass: CustomTitleStrategyService },
    provideAnimations(),
    provideHttpClient(),
    provideRouter(APP_ROUTES),
  ],
};
