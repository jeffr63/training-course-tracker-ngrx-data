import { Component } from '@angular/core';

import { Auth0Service } from '../auth/auth.service';

@Component({
  selector: 'app-menu',

  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" [routerLink]="['/']" id="brand">Training Courses Tracker</a>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
        (click)="isNavbarCollapsed = !isNavbarCollapsed"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div (ngbCollapse)="(isNavbarCollapsed)" class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <a class="nav-item nav-link active" [routerLink]="['/']" id="home"
            >Home <span class="sr-only">(current)</span></a
          >
          <a class="nav-item nav-link" [routerLink]="['/courses']" id="courses">Courses</a>
          <a class="nav-item nav-link" *ngIf="auth.isAuthenticated === false" (click)="auth.login()" id="login"
            >Login</a
          >
          <a class="nav-item nav-link" [routerLink]="['/admin']" *ngIf="auth.isAuthenticated && auth.isAdmin" id="admin"
            >Admin</a
          >
          <a class="nav-item nav-link" *ngIf="auth.isAuthenticated" (click)="auth.logout()" id="logout">Logout</a>
        </div>
      </div>
    </nav>
  `,

  styles: [
    `
      div .nav-item {
        cursor: pointer;
      }
    `,
  ],
})
export class MenuComponent {
  public isNavbarCollapsed = true;

  constructor(public auth: Auth0Service) {}
}
