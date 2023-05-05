import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { DeleteComponent } from '../modals/delete.component';
import { ListDisplayComponent } from '../shared/list-display.component';
import { ListHeaderComponent } from '../shared/list-header.component';
import { ModalDataService } from '../modals/modal-data.service';
import { Path } from '../models/paths';
import { PathService } from '../services/path.service';

@Component({
  selector: 'app-path-list',
  standalone: true,
  imports: [AsyncPipe, ListDisplayComponent, ListHeaderComponent, NgbModule],

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Paths</h1>
        </header>
        <section class="card-body">
          <app-list-header (newItem)="newPath()"></app-list-header>

          <app-list-display
            [headers]="headers"
            [columns]="columns"
            [items]="paths$ | async"
            [isAuthenticated]="isAuthenticated"
            (deleteItem)="deletePath($event)"
            (editItem)="editPath($event)"
          ></app-list-display>
        </section>
      </section>
    </section>
  `,

  styles: ['header { padding-bottom: 10px; }'],
})
export default class PathListComponent implements OnInit {
  modal = inject(NgbModal);
  modalDataService = inject(ModalDataService);
  pathService = inject(PathService);
  router = inject(Router);

  columns = ['name'];
  headers = ['Path'];
  isAuthenticated = true;
  paths$: Observable<Path[]>;

  ngOnInit() {
    this.pathService.getAll();
    this.paths$ = this.pathService.entities$;
  }

  deletePath(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this path?',
      body: 'All information associated to this path will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((result) => {
      this.pathService.delete(id);
    });
  }

  editPath(id) {
    this.router.navigate(['/admin/paths', id]);
  }

  newPath() {
    this.router.navigate(['/admin/paths/new']);
  }
}
