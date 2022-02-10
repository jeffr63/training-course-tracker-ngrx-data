import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable } from 'rxjs';
import { faPencilAlt, faTrashAlt, faPlusCircle, faBan } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../auth/auth.service';
import { Course } from '../shared/course';
import { CourseService } from './course.service';

@Component({
  selector: 'app-course-list',

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Training Courses</h1>
        </header>
        <section class="card-body">
          <header class="row">
            <div class="col">
              <ngb-pagination
                [collectionSize]="totalCourses$ | async"
                [boundaryLinks]="true"
                [pageSize]="pageSize"
                [maxSize]="5"
                [rotate]="true"
                [(page)]="current"
                (pageChange)="refreshTable()"
              ></ngb-pagination>
            </div>
            <div class="col" *ngIf="authService.isAuthenticated">
              <a [routerLink]="['/courses/new']" title="Add Course">
                <fa-icon [icon]="faPlusCircle" class="fa-2x text-success"></fa-icon>
                <span class="sr-only">Add Course</span>
              </a>
            </div>
          </header>
          <table class="table table-striped">
            <thead>
              <th>Title</th>
              <th>Instructor</th>
              <th>Path</th>
              <th>Source</th>
              <th>&nbsp;</th>
            </thead>
            <tbody>
              <tr *ngFor="let course of courses$ | async">
                <td>{{ course.title }}</td>
                <td>{{ course.instructor }}</td>
                <td>{{ course.path }}</td>
                <td>{{ course.source }}</td>
                <td *ngIf="authService.isAuthenticated">
                  <a [routerLink]="['/courses', course.id]" class="btn btn-info btn-sm mr-2" title="Edit">
                    <fa-icon [icon]="faPencilAlt"></fa-icon>
                    <span class="sr-only">Edit</span>
                  </a>
                  <button class="btn btn-danger btn-sm" (click)="deleteCourse(course.id, deleteModal)" title="Delete">
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
          <p><strong>Are you sure you want to delete this course?</strong></p>
          <p>
            All information associated to this course will be permanently deleted.
            <span class="text-danger">This operation can not be undone.</span>
          </p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" (click)="modal.close()" title="Delete">
            <fa-icon [icon]="faTrashAlt"></fa-icon> Delete
          </button>
          <button class="btn btn-danger" (click)="modal.dismiss()" title="Cancel">
            <fa-icon [icon]="faBan"></fa-icon> Cancel
          </button>
        </div>
      </ng-template>
    </section>
  `,

  styles: [],
})
export class CourseListComponent implements OnInit {
  courses$: Observable<Course[]>;
  current = 1;
  loading = false;
  pageSize = 10;
  totalCourses$: Observable<number>;
  closedResult = '';
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;
  faBan = faBan;

  constructor(private courseService: CourseService, private modal: NgbModal, public authService: AuthService) {}

  ngOnInit() {
    this.refreshTable();
    this.totalCourses$ = this.refreshTotal();
  }

  deleteCourse(id, deleteModal) {
    this.modal.open(deleteModal).result.then(
      (result) => {
        this.closedResult = `Closed with ${result}`;
        this.courseService.delete(id);
        this.refreshTable();
      },
      (reason) => {
        this.closedResult = `Dismissed with ${reason}`;
      }
    );
  }

  refreshTotal(): Observable<number> {
    return this.courseService.getAll().pipe(map((courses: Course[]) => courses.length));
  }

  refreshTable() {
    this.courses$ = this.courseService.getWithQuery({
      _sort: 'title',
      _order: 'asc',
      _page: `${this.current}`,
      _limit: `${this.pageSize}`,
    });
  }
}
