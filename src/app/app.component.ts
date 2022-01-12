import { Component, OnInit } from '@angular/core';

import { Auth0Service } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Training Course Tracker';

  constructor(public auth: Auth0Service) {}

  ngOnInit() {
    this.auth.handleAuthentication();
  }
}
