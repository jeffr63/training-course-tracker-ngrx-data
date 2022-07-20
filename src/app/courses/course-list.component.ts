import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Course } from '../shared/course';
import { CourseService } from './course.service';
import { DeleteComponent } from '../modals/delete.component';
import { ModalDataService } from '../modals/modal-data.service';

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
                <i class="bi bi-plus-circle-fill display-6 text-success"></i>
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
                  <a [routerLink]="['/courses', course.id]" class="btn btn-info btn-sm me-2" title="Edit">
                    <i class="bi bi-pencil-fill"></i>
                  </a>
                  <button class="btn btn-danger btn-sm" (click)="deleteCourse(course.id)" title="Delete">
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
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

  constructor(
    private courseService: CourseService,
    private modal: NgbModal,
    public authService: AuthService,
    private modalDataService: ModalDataService
  ) {}

  ngOnInit() {
    this.refreshTable();
    this.totalCourses$ = this.refreshTotal();
  }

  deleteCourse(id: number) {
    const modalOptions = {
      title: 'Are you sure you want to delete this course?',
      body: 'All information associated to this course will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.modalDataService.setDeleteModalOptions(modalOptions);
    this.modal.open(DeleteComponent).result.then((result) => {
      this.courseService.delete(id);
      this.refreshTable();
    });
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
