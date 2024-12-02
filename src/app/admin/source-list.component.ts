import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DeleteComponent } from '@modals/delete.component';
import { ListDisplayComponent } from '@shared/components/list-display.component';
import { ListHeaderComponent } from '@shared/components/list-header.component';
import { ModalDataService } from '@services/modal-data.service';
import { SourceService } from '@services/source.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-source-list',
  imports: [ListDisplayComponent, ListHeaderComponent, NgbModule],
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
            [items]="sources()"
            [isAuthenticated]="true"
            (deleteItem)="deleteSource($event)"
            (editItem)="editSource($event)"></app-list-display>
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
export default class SourceListComponent implements OnInit {
  readonly #modal = inject(NgbModal);
  readonly #modalDataService = inject(ModalDataService);
  readonly #router = inject(Router);
  readonly #sourceService = inject(SourceService);

  protected readonly columns = ['name'];
  protected readonly headers = ['Source'];
  protected sources = toSignal(this.#sourceService.entities$);

  ngOnInit() {
    this.#sourceService.getAll();
  }

  protected deleteSource(id) {
    const modalOptions = {
      title: 'Are you sure you want to delete this source?',
      body: 'All information associated to this path will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.#modalDataService.setDeleteModalOptions(modalOptions);
    this.#modal.open(DeleteComponent).result.then((result) => {
      this.#sourceService.delete(id);
    });
  }

  protected editSource(id: number) {
    this.#router.navigate(['/admin/sources', id]);
  }

  protected newSource() {
    this.#router.navigate(['/admin/sources/new']);
  }
}
