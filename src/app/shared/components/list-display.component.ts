import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-list-display',
  standalone: true,
  imports: [],

  template: `
    <table class="table table-striped">
      <thead>
        @for (header of headers(); track $index) {
        <th>{{ header }}</th>
        }
        <th>&nbsp;</th>
      </thead>
      <tbody>
        @for (item of items(); track $index) {
        <tr>
          @for (column of columns(); track $index) {
          <td>{{ item[column] }}</td>
          } @if (isAuthenticated) {
          <td>
            <button class="btn btn-info btn-sm me-2" (click)="editClicked(item.id)" title="Edit">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button class="btn btn-danger btn-sm" (click)="deleteClicked(item.id)" title="Delete">
              <i class="bi bi-trash3-fill"></i>
            </button>
          </td>
          }
        </tr>
        }
      </tbody>
    </table>
  `,

  styles: [],
})
export class ListDisplayComponent {
  columns = input.required<string[]>();
  headers = input.required<string[]>();
  items = input.required<any[]>();
  isAuthenticated = input.required<boolean>();
  deleteItem = output<number>();
  editItem = output<number>();

  protected editClicked(id: number) {
    this.editItem.emit(id);
  }

  protected deleteClicked(id: number) {
    this.deleteItem.emit(id);
  }
}
