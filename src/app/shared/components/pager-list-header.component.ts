import { Component, Input, Output, EventEmitter, output, model, input } from '@angular/core';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pager-list-header',
  standalone: true,
  imports: [NgbPaginationModule],

  template: `
    <header class="row">
      <div class="col">
        <ngb-pagination
          [collectionSize]="total()"
          [boundaryLinks]="true"
          [pageSize]="pageSize()"
          [maxSize]="maxSize()"
          [rotate]="true"
          [(page)]="current"
          (pageChange)="onPageChange()"></ngb-pagination>
      </div>
      @if (isAuthenticated) {
      <div class="col">
        <button class="btn btn-sm" (click)="newClicked()" title="Add">
          <i class="bi bi-plus-circle-fill display-6 text-success"></i>
        </button>
      </div>
      }
    </header>
  `,

  styles: [],
})
export class PagerListHeaderComponent {
  current = model<number>(1);
  isAuthenticated = input(false);
  maxSize = input(5);
  pageSize = input(10);
  total = input(0);
  newCourse = output();
  refreshTable = output();

  protected onPageChange() {
    this.refreshTable.emit();
  }

  protected newClicked() {
    this.newCourse.emit();
  }
}
