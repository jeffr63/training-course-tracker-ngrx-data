import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter, TitleStrategy } from '@angular/router';

import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { entityConfig } from './entity-metadata';
import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { CustomTitleStrategyService } from './services/custom-title-strategy.service';

export class BootComponent {
  public static bootstrap() {
    // alternative bootstrap method discussed on Angular Air.  This moves all of the boilerplate out of main.ts and moved to bootstraped component.
    const defaultDataServiceConfig: DefaultDataServiceConfig = {
      root: 'http://localhost:3000',
      timeout: 3000, // request timeout
    };

    if (environment.production) {
      enableProdMode();
    }

    bootstrapApplication(AppComponent, {
      providers: [
        importProvidersFrom(
          HttpClientModule,
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
        provideRouter(APP_ROUTES),
      ],
    }).catch((err) => console.error(err));
  }
}
