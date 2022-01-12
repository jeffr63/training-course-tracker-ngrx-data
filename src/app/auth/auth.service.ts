import { Injectable } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class Auth0Service {
  public isAdmin = false;
  public isAuthenticated = false;
  public roles;

  constructor(public auth0: AuthService) {}

  public login(): void {
    this.auth0.loginWithRedirect();
  }

  public logout(): void {
    this.auth0.logout({ returnTo: window.location.origin });
  }

  public handleAuthentication(): void {
    const arg = 'http://localhost:4200/roles';
    this.auth0.isAuthenticated$.subscribe((value) => {
      this.isAuthenticated = value;
      if (value) {
        this.auth0.user$.subscribe((info) => {
          this.roles = info[arg];
          this.isAdmin = this.roles[0] === 'admin' ? true : false;
        });
      } else {
        this.roles = [];
        this.isAdmin = false;
      }
    });
  }
}
