import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DeleteComponent } from '@modals/delete.component';
import { ListDisplayComponent } from '@shared/components/list-display.component';
import { ModalDataService } from '@shared/services/common/modal-data.service';
import { UserService } from '@shared/services/user/user.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-list',
  imports: [NgbModule, ListDisplayComponent],
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
              (editItem)="editUser($event)"></app-list-display>
          </section>
        </section>
      </section>
    </section>
  `,
  styles: [],
})
export default class UserListComponent implements OnInit {
  readonly #modal = inject(NgbModal);
  readonly #modalDataService = inject(ModalDataService);
  readonly #router = inject(Router);
  readonly #userService = inject(UserService);

  protected readonly columns = ['name', 'email', 'role'];
  protected readonly headers = ['Name', 'Email', 'Role'];
  protected readonly users = toSignal(this.#userService.entities$);

  ngOnInit() {
    this.#userService.getAll();
  }

  protected deleteUser(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this user?',
      body: 'All information associated to this path will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.#modalDataService.setDeleteModalOptions(modalOptions);
    this.#modal.open(DeleteComponent).result.then((result) => {
      this.#userService.delete(id);
    });
  }

  protected editUser(id: number) {
    this.#router.navigate(['/admin/users', id]);
  }
}
