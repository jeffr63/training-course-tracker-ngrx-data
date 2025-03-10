import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '@shared/services/auth/auth.service';
import { LoginComponent } from '@modals/login.component';
import { MenuToolbarComponent } from './menu-toolbar.component';

@Component({
  selector: 'app-menu',
  imports: [MenuToolbarComponent],
  template: `<app-menu-toolbar
    [isLoggedIn]="isLoggedIn()"
    [isAdmin]="isAdmin()"
    (logout)="logout()"
    (login)="login()" />`,
})
export class MenuComponent {
  readonly #authService = inject(AuthService);
  readonly #modalService = inject(NgbModal);
  readonly #router = inject(Router);

  protected readonly isLoggedIn = this.#authService.isLoggedIn;
  protected readonly isAdmin = this.#authService.isLoggedInAsAdmin;

  protected login() {
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
