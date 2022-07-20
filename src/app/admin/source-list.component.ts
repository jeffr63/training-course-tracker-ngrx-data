import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
                <i class="bi bi-plus-circle-fill display-6 text-success"></i>
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
                  <a [routerLink]="['/admin/sources', source.id]" class="btn btn-info btn-sm me-2" title="Edit">
                    <i class="bi bi-pencil-fill"></i>
                  </a>
                  <button class="btn btn-danger btn-sm" (click)="deleteSource(source.id)" title="Delete">
                    <i class="bi bi-trash3-fill"></i>
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
      warning: 'This operation cannot be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((result) => {
      this.sourceService.delete(id);
    });
  }
}
