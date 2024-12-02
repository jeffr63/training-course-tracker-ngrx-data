import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DeleteComponent } from '@modals/delete.component';
import { ListDisplayComponent } from '@shared/components/list-display.component';
import { ListHeaderComponent } from '@shared/components/list-header.component';
import { ModalDataService } from '@services/modal-data.service';
import { PathService } from '@services/path.service';

@Component({
  selector: 'app-path-list',
  imports: [ListDisplayComponent, ListHeaderComponent, NgbModule],
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
            [items]="paths()"
            [isAuthenticated]="true"
            (deleteItem)="deletePath($event)"
            (editItem)="editPath($event)"></app-list-display>
        </section>
      </section>
    </section>
  `,
  styles: ['header { padding-bottom: 10px; }'],
})
export default class PathListComponent implements OnInit {
  readonly #modal = inject(NgbModal);
  readonly #modalDataService = inject(ModalDataService);
  readonly #pathService = inject(PathService);
  readonly #router = inject(Router);

  protected readonly columns = ['name'];
  protected readonly headers = ['Path'];
  protected readonly paths = toSignal(this.#pathService.entities$);

  ngOnInit() {
    this.#pathService.getAll();
  }

  protected deletePath(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this path?',
      body: 'All information associated to this path will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.#modalDataService.setDeleteModalOptions(modalOptions);
    this.#modal.open(DeleteComponent).result.then((result) => {
      this.#pathService.delete(id);
    });
  }

  protected editPath(id) {
    this.#router.navigate(['/admin/paths', id]);
  }

  protected newPath() {
    this.#router.navigate(['/admin/paths/new']);
  }
}
