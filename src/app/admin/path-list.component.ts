import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { DeleteComponent } from '../modals/delete.component';
import { ModalDataService } from '../modals/modal-data.service';
import { Path } from '../models/paths';
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
export class PathListComponent implements OnInit {
  columns = ['name'];
  headers = ['Path'];
  isAuthenticated = true;
  paths$: Observable<Path[]>;

  constructor(
    private pathService: PathService,
    private modal: NgbModal,
    private modalDataService: ModalDataService,
    private router: Router
  ) {}

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

  editPath(id: number) {
    this.router.navigate(['/admin/paths', id]);
  }

  newPath() {
    this.router.navigate(['/admin/paths/new']);
  }
}
