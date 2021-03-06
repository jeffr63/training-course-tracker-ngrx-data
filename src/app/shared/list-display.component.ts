import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-display',
  standalone: true,
  imports: [CommonModule],

  template: `
    <table class="table table-striped">
      <thead>
        <th *ngFor="let header of headers">
          {{ header }}
        </th>
        <th>&nbsp;</th>
      </thead>
      <tbody>
        <tr *ngFor="let item of items">
          <td *ngFor="let column of columns">
            {{ item[column] }}
          </td>
          <td *ngIf="isAuthenticated">
            <button class="btn btn-info btn-sm me-2" (click)="editClicked(item.id)" title="Edit">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button class="btn btn-danger btn-sm" (click)="deleteClicked(item.id)" title="Delete">
              <i class="bi bi-trash3-fill"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,

  styles: [],
})
export class ListDisplayComponent {
  @Input() columns: string[];
  @Input() headers: string[];
  @Input() items: any[];
  @Input() isAuthenticated: boolean;
  @Output() deleteItem = new EventEmitter();
  @Output() editItem = new EventEmitter();

  constructor() {}

  editClicked(id: number) {
    this.editItem.emit(id);
  }

  deleteClicked(id: number) {
    this.deleteItem.emit(id);
  }
}
