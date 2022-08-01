import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, enableProdMode, importProvidersFrom, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, TitleStrategy } from '@angular/router';

import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { entityConfig } from './entity-metadata';
import { APP_ROUTES } from './app.routes';
import { AuthService } from './auth/auth.service';
import { CustomTitleStrategyService } from './services/custom-title-strategy.service';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, RouterModule],
  template: `
    <app-menu></app-menu>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'Training Course Tracker';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkLogin();
  }

  public static bootstrap() {
    // alternative bootstrap method discussed on Angular Air.  This moves all of the boilerplate out of main.ts and moved to bootstraped component.
    const defaultDataServiceConfig: DefaultDataServiceConfig = {
      root: 'http://localhost:3000',
      timeout: 3000, // request timeout
    };

    if (environment.production) {
      enableProdMode();
    }

    bootstrapApplication(this, {
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
  }
}
