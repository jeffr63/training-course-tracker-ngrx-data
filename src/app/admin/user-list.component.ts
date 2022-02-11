import { Component, OnInit } from '@angular/core';

import { faPencilAlt, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { DeleteComponent } from '../modals/delete.component';
import { ModalDataService } from '../modals/modal-data.service';
import { User } from '../shared/user';
import { UserService } from '../services/user.service';

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
                  <button class="btn btn-danger btn-sm" (click)="deleteUser(user.id)" title="Delete">
                    <fa-icon [icon]="faTrashAlt"></fa-icon>
                    <span class="sr-only">Delete</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
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

  constructor(private userService: UserService, private modal: NgbModal, private modalDataService: ModalDataService) {}

  ngOnInit() {
    this.userService.getAll();
    this.users$ = this.userService.entities$;
  }

  deleteUser(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this user?',
      body: 'All information associated to this path will be permanently deleted.',
      warning: 'This operation can not be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((result) => {
      this.userService.delete(id);
    });
  }
}
