import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Auth0Service } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateEdit implements CanActivate {
  constructor(private authService: Auth0Service, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
