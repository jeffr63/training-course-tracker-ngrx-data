import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DeleteComponent } from '../modals/delete.component';
import { ModalDataService } from '../modals/modal-data.service';
import { Source } from '../models/sources';
import { SourceService } from '../services/source.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-source-list',

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Sources</h1>
        </header>
        <section class="card-body">
          <app-list-header (newItem)="newSource()"></app-list-header>

          <app-list-display
            [headers]="headers"
            [columns]="columns"
            [items]="sources$ | async"
            [isAuthenticated]="isAuthenticated"
            (deleteItem)="deleteSource($event)"
            (editItem)="editSource($event)"
          ></app-list-display>
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
  columns = ['name'];
  headers = ['Source'];
  isAuthenticated = true;
  sources$: Observable<Source[]>;
  closedResult = '';

  constructor(
    private sourceService: SourceService,
    private modal: NgbModal,
    private modalDataService: ModalDataService,
    private router: Router
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

  editSource(id: number) {
    this.router.navigate(['/admin/sources', id]);
  }

  newSource() {
    this.router.navigate(['/admin/sources/new']);
  }
}
