import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { entityConfig } from './app/entity-metadata';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, TitleStrategy } from '@angular/router';

import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { APP_ROUTES } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { CustomTitleStrategyService } from './app/services/custom-title-strategy.service';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:3000',
  timeout: 3000, // request timeout
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      EntityDataModule.forRoot(entityConfig),
      StoreDevtoolsModule.instrument({
        maxAge: 5,
        logOnly: environment.production,
      }),
      RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: 'legacy' })
    ),
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    { provide: TitleStrategy, useClass: CustomTitleStrategyService },
  ],
}).catch((err) => console.error(err));

