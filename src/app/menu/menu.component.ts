import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '@shared/services/auth/auth.service';
import { LoginComponent } from '@modals/login.component';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" [routerLink]="['/']" id="brand">Training Courses Tracker</a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav ms-auto">
          <a class="nav-item nav-link active" [routerLink]="['/']" aria-current="page" id="home"> Home </a>
          <a class="nav-item nav-link" [routerLink]="['/courses']" id="courses">Courses</a>
          @if (isLoggedIn()) { @if (isAdmin()) {
          <a class="nav-item nav-link" [routerLink]="['/admin']" id="admin"> Admin </a>
          }
          <a class="nav-item nav-link" (click)="logout()" id="logout">Logout</a>
          } @else {
          <a class="nav-item nav-link" (click)="open()" id="login">Login</a>
          }
        </ul>
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
  readonly #authService = inject(AuthService);
  readonly #modalService = inject(NgbModal);
  readonly #router = inject(Router);

  protected readonly isLoggedIn = this.#authService.isLoggedIn;
  protected readonly isAdmin = this.#authService.isLoggedInAsAdmin;

  protected open() {
    this.#modalService.open(LoginComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result) {
        this.#authService.login(result.email, result.password).subscribe();
      }
    });
  }

  protected logout() {
    this.#authService.logout();
    this.#router.navigate(['/']);
  }
}
