import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { DeleteComponent } from '@modals/delete.component';
import { ListDisplayComponent } from '@shared/components/list-display.component';
import { ModalDataService } from '@services/modal-data.service';
import { User } from '@models/user';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AsyncPipe, NgbModule, ListDisplayComponent],

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Users</h1>
        </header>
        <section class="card-body">
          <section class="card-body">
            <app-list-display
              [headers]="headers"
              [columns]="columns"
              [items]="users$ | async"
              [isAuthenticated]="isAuthenticated"
              (deleteItem)="deleteUser($event)"
              (editItem)="editUser($event)"
            ></app-list-display>
          </section>
        </section>
      </section>
    </section>
  `,
  styles: [],
})
export default class UserListComponent implements OnInit {
  userService = inject(UserService);
  modal = inject(NgbModal);
  modalDataService = inject(ModalDataService);
  router = inject(Router);

  columns = ['name', 'email', 'role'];
  closedResult = '';
  headers = ['Name', 'Email', 'Role'];
  isAuthenticated = true;
  users$: Observable<User[]>;

  ngOnInit() {
    this.userService.getAll();
    this.users$ = this.userService.entities$;
  }

  deleteUser(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this user?',
      body: 'All information associated to this path will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((result) => {
      this.userService.delete(id);
    });
  }

  editUser(id: number) {
    this.router.navigate(['/admin/users', id]);
  }
}
