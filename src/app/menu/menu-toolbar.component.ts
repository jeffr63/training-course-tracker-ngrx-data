import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-toolbar',
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
          <a class="nav-item nav-link" (click)="logout.emit()" id="logout">Logout</a>
          } @else {
          <a class="nav-item nav-link" (click)="login.emit()" id="login">Login</a>
          }
        </ul>
      </div>
    </nav>
  `,
  styles: `
    div .nav-item {
      cursor: pointer;
    }
  `,
})
export class MenuToolbarComponent {
  isLoggedIn = input.required();
  isAdmin = input.required();
  login = output();
  logout = output();
}
