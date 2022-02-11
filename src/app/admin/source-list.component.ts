import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPencilAlt, faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { DeleteComponent } from '../modals/delete.component';
import { ModalDataService } from '../modals/modal-data.service';
import { Source } from '../shared/sources';
import { SourceService } from '../services/source.service';

@Component({
  selector: 'app-source-list',

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Sources</h1>
        </header>
        <section class="card-body">
          <header class="row">
            <div class="col">&nbsp;</div>
            <div class="col">
              <a [routerLink]="['/admin/sources/new']" title="Add Source">
                <fa-icon [icon]="faPlusCircle" class="fa-2x text-success"></fa-icon>
                <span class="sr-only">Add Source</span>
              </a>
            </div>
          </header>
          <table class="table table-striped">
            <thead>
              <th>Source</th>
              <th>&nbsp;</th>
            </thead>
            <tbody>
              <tr *ngFor="let source of sources$ | async">
                <td>{{ source.name }}</td>
                <td>
                  <a [routerLink]="['/admin/sources', source.id]" class="btn btn-info btn-sm mr-2" title="Edit">
                    <fa-icon [icon]="faPencilAlt"></fa-icon>
                    <span class="sr-only">Edit</span>
                  </a>
                  <button class="btn btn-danger btn-sm" (click)="deleteSource(source.id)" title="Delete">
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

  styles: [
    `
      header {
        padding-bottom: 10px;
      }
    `,
  ],
})
export class SourceListComponent implements OnInit {
  sources$: Observable<Source[]>;
  closedResult = '';
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;

  constructor(
    private sourceService: SourceService,
    private modal: NgbModal,
    private modalDataService: ModalDataService
  ) {}

  ngOnInit() {
    this.sourceService.getAll();
    this.sources$ = this.sourceService.entities$;
  }

  deleteSource(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this source?',
      body: 'All information associated to this path will be permanently deleted.',
      warning: 'This operation can not be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((result) => {
      this.sourceService.delete(id);
    });
  }
}
