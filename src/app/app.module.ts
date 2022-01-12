import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// third party modules
import { AuthModule } from '@auth0/auth0-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// custom components
import { AppComponent } from './app.component';
import { AppEffects } from './store/app.effects';
import { AppRoutingModule } from './app-routing.module';
import { AUTH_CONFIG } from '../environments/auth0-variables';
import { CallbackComponent } from './callback.component';
import { CourseEffects } from './store/course/course.effects';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environment.prod';
import { MenuComponent } from './menu/menu.component';
import { PathsEffects } from './store/paths/paths.effects';
import { reducers, metaReducers } from './store';
import { SourcesEffects } from './store/sources/sources.effects';

@NgModule({
  declarations: [AppComponent, DashboardComponent, MenuComponent, CallbackComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    NgxChartsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects, CourseEffects, PathsEffects, SourcesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 5,
      logOnly: environment.production,
    }),
    AuthModule.forRoot({
      clientId: AUTH_CONFIG.clientID,
      domain: AUTH_CONFIG.domain,
      responseType: 'token id_token',
      redirectUri: AUTH_CONFIG.callbackURL,
      scope: 'openid profile',
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
