import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable } from 'rxjs';

import { AuthService } from '@services/auth.service';
import { Course } from '@models/course';
import { CourseService } from '@services/course.service';
import { DeleteComponent } from '@modals/delete.component';
import { ListDisplayComponent } from '@shared/components/list-display.component';
import { ModalDataService } from '@services/modal-data.service';
import { PagerListHeaderComponent } from '@shared/components/pager-list-header.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [AsyncPipe, ListDisplayComponent, PagerListHeaderComponent, NgbModule],

  template: `
    <section>
      <section class="card">
        <header>
          <h1 class="card-header">Training Courses</h1>
        </header>
        <section class="card-body">
          <app-pager-list-header
            includePager="true"
            [total]="totalCourses$ | async"
            [pageSize]="pageSize"
            [maxSize]="5"
            [(current)]="current"
            [isAuthenticated]="isLoggedIn()"
            (refreshTable)="refreshTable()"
            (newCourse)="newCourse()"
          >
          </app-pager-list-header>

          <app-list-display
            [headers]="headers"
            [columns]="columns"
            [items]="courses$ | async"
            [isAuthenticated]="isLoggedIn()"
            (deleteItem)="deleteCourse($event)"
            (editItem)="editCourse($event)"
          ></app-list-display>
        </section>
      </section>
    </section>
  `,

  styles: [],
})
export default class CourseListComponent implements OnInit {
  private authService = inject(AuthService);
  private courseService = inject(CourseService);
  private modal = inject(NgbModal);
  private modalDataService = inject(ModalDataService);
  private router = inject(Router);

  columns = ['title', 'instructor', 'path', 'source'];
  headers = ['Title', 'Instructor', 'Path', 'Source'];
  courses$: Observable<Course[]>;
  current = 1;
  isLoggedIn = this.authService.isLoggedIn;
  pageSize = 10;
  totalCourses$: Observable<number>;
  closedResult = '';

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

  editCourse(id) {
    this.router.navigate(['/courses', id]);
  }

  newCourse() {
    this.router.navigate(['/courses/new']);
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
