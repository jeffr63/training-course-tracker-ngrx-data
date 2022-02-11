import { Component, OnInit, Output } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { faPencilAlt, faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { DeleteComponent } from '../modals/delete.component';
import { ModalDataService } from '../modals/modal-data.service';
import { Path } from '../shared/paths';
import { PathService } from '../services/path.service';

@Component({
  selector: 'app-path-list',

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Paths</h1>
        </header>
        <section class="card-body">
          <header class="row">
            <div class="col">&nbsp;</div>
            <div class="col">
              <a [routerLink]="['/admin/paths/new']" title="Add Path">
                <fa-icon [icon]="faPlusCircle" class="fa-2x text-success"></fa-icon>
                <span class="sr-only">Add Path</span>
              </a>
            </div>
          </header>
          <table class="table table-striped">
            <thead>
              <th>Path</th>
              <th>&nbsp;</th>
            </thead>
            <tbody>
              <tr *ngFor="let path of paths$ | async">
                <td>{{ path.name }}</td>
                <td>
                  <a [routerLink]="['/admin/paths', path.id]" class="btn btn-info btn-sm mr-2" title="Edit">
                    <fa-icon [icon]="faPencilAlt"></fa-icon>
                    <span class="sr-only">Edit</span>
                  </a>
                  <button class="btn btn-danger btn-sm" (click)="deletePath(path.id)" title="Delete">
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

  styles: ['header { padding-bottom: 10px; }'],
})
export class PathListComponent implements OnInit {
  paths$: Observable<Path[]>;
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;

  constructor(private pathService: PathService, private modal: NgbModal, private modalDataService: ModalDataService) {}

  ngOnInit() {
    this.pathService.getAll();
    this.paths$ = this.pathService.entities$;
  }

  deletePath(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this path?',
      body: 'All information associated to this path will be permanently deleted.',
      warning: 'This operation can not be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((result) => {
      this.pathService.delete(id);
    });
  }
}
