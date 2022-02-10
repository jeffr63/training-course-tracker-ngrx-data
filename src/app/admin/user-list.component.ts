import { Component, OnInit } from '@angular/core';

import { faBan, faPencilAlt, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-user-list',
  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Users</h1>
        </header>
        <section class="card-body">
          <table class="table table-striped">
            <thead>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>&nbsp;</th>
            </thead>
            <tbody>
              <tr *ngFor="let user of users$ | async">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
                <td>
                  <a [routerLink]="['/admin/users', user.id]" class="btn btn-info btn-sm mr-2" title="Edit">
                    <fa-icon [icon]="faPencilAlt"></fa-icon>
                    <span class="sr-only">Edit</span>
                  </a>
                  <button class="btn btn-danger btn-sm" (click)="deleteUser(user.id, deleteModal)" title="Delete">
                    <fa-icon [icon]="faTrashAlt"></fa-icon>
                    <span class="sr-only">Delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>

      <ng-template #deleteModal let-modal>
        <div class="modal-header">
          <span class="modal-title">Delete?</span>
        </div>
        <div class="modal-body">
          <p><strong>Are you sure you want to delete this user?</strong></p>
          <p>
            All information associated to this path will be permanently deleted.
            <span class="text-danger">This operation can not be undone.</span>
          </p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" (click)="modal.close()" title="Delete">
            <fa-icon [icon]="faTrashAlt"></fa-icon> Delete
          </button>
          <button class="btn btn-danger" (click)="modal.dismiss()" title="Cancel">
            <fa-icon [icon]="faBan"></fa-icon> Cancel
          </button>
        </div>
      </ng-template>
    </section>
  `,
  styles: [],
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  closedResult = '';
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;
  faBan = faBan;

  constructor(private userService: UserService, private modal: NgbModal) {}

  ngOnInit() {
    this.userService.getAll();
    this.users$ = this.userService.entities$;
  }

  deleteUser(id, deleteModal) {
    this.modal.open(deleteModal).result.then((result) => {
      this.userService.delete(id);
    });
  }
}
