import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';

import { Auth0Service } from './auth.service';

describe('Auth0Service', () => {
  let service: Auth0Service;
  let authSpy;

  beforeEach(() => {
    authSpy = jasmine.createSpyObj(AuthService, ['loginWithRedirect', 'logout', 'user$', 'isAuthenticated$']);
  });

  afterEach(() => {
    service = null;
  });

  it('should be created', () => {
    service = new Auth0Service(authSpy);
    expect(service).toBeTruthy();
  });

  it('should call loginWithRedirect when login is called', () => {
    authSpy.loginWithRedirect.and.returnValue(true);
    service = new Auth0Service(authSpy);
    service.login();
    expect(authSpy.loginWithRedirect).toHaveBeenCalledTimes(1);
  });

  it('should call logout when logout is called', () => {
    authSpy.logout.and.returnValue(true);
    service = new Auth0Service(authSpy);
    service.logout();
    expect(authSpy.logout).toHaveBeenCalledTimes(1);
  });

  it('should set the isAuthenticated true when handleAuthentication is called', () => {
    authSpy.isAuthenticated$ = of(true);
    const stubValue = {
      'http://localhost:4200': ['admin'],
    };
    authSpy.user$ = of(stubValue);
    service = new Auth0Service(authSpy);
    service.handleAuthentication();
    expect(service.isAuthenticated).toBeTrue;
  });

  it('should set the isAdmin true when handleAuthentication is called and admin', () => {
    authSpy.isAuthenticated$ = of(true);
    const stubValue = {
      'http://localhost:4200': ['admin'],
    };
    authSpy.user$ = of(stubValue);
    service = new Auth0Service(authSpy);
    service.handleAuthentication();
    expect(service.isAdmin).toBeTrue;
  });

  it('should set the isAdmin false when handleAuthentication is called and not admin', () => {
    authSpy.isAuthenticated$ = of(true);
    const stubValue = {
      'http://localhost:4200': ['user'],
    };
    authSpy.user$ = of(stubValue);
    service = new Auth0Service(authSpy);
    service.handleAuthentication();
    expect(service.isAdmin).toBeFalse;
  });
});
