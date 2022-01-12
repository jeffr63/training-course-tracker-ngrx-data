import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faPencilAlt, faTrashAlt, faPlusCircle, faBan } from '@fortawesome/free-solid-svg-icons';

import * as fromRoot from '../store';
import * as sourcesSelectors from '../store/sources/sources.selectors';
import * as sourcesActions from '../store/sources/sources.actions';
import { Source } from '../shared/sources';

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
              <th>Path</th>
              <th>&nbsp;</th>
            </thead>
            <tbody>
              <tr *ngFor="let source of source$ | async">
                <td>{{ source.name }}</td>
                <td>
                  <a [routerLink]="['/admin/sources', source.id]" class="btn btn-info btn-sm mr-2" title="Edit">
                    <fa-icon [icon]="faPencilAlt"></fa-icon>
                    <span class="sr-only">Edit</span>
                  </a>
                  <button class="btn btn-danger btn-sm" (click)="deleteSource(source.id, deleteModal)" title="Delete">
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
          <p><strong>Are you sure you want to delete this source?</strong></p>
          <p>
            All information associated to this source will be permanently deleted.
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

  styles: [
    `
      header {
        padding-bottom: 10px;
      }
    `,
  ],
})
export class SourceListComponent implements OnInit {
  source$: Observable<any[]>;
  selectPath = <Source>{};
  closedResult = '';
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;
  faBan = faBan;

  constructor(private store: Store<fromRoot.State>, private modal: NgbModal) {}

  ngOnInit() {
    this.store.dispatch(sourcesActions.loadSources());
    this.source$ = this.store.pipe(select(sourcesSelectors.getSources));
  }

  deleteSource(id, deleteModal) {
    this.modal.open(deleteModal).result.then(
      (result) => {
        this.closedResult = `Closed with ${result}`;
        this.store.dispatch(sourcesActions.deleteSource({ id }));
      },
      (reason) => {
        this.closedResult = `Dismissed with ${reason}`;
      }
    );
  }
}
