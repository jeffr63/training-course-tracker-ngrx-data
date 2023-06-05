import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DeleteComponent } from '@modals/delete.component';
import { ListDisplayComponent } from '@shared/components/list-display.component';
import { ModalDataService } from '@services/modal-data.service';
import { UserService } from '@services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
              [items]="users()"
              [isAuthenticated]="true"
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
  private modal = inject(NgbModal);
  private modalDataService = inject(ModalDataService);
  private router = inject(Router);
  private userService = inject(UserService);

  columns = ['name', 'email', 'role'];
  closedResult = '';
  headers = ['Name', 'Email', 'Role'];
  users = toSignal(this.userService.entities$);

  ngOnInit() {
    this.userService.getAll();
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
