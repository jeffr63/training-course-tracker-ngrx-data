import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable } from 'rxjs';

import { AuthService } from '@shared/services/auth/auth.service';
import { Course } from '@models/course';
import { CourseService } from '@shared/services/course/course.service';
import { DeleteComponent } from '@modals/delete.component';
import { ListDisplayComponent } from '@shared/components/list-display.component';
import { ModalDataService } from '@shared/services/common/modal-data.service';
import { PagerListHeaderComponent } from '@shared/components/pager-list-header.component';

@Component({
  selector: 'app-course-list',
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
            (newCourse)="newCourse()">
          </app-pager-list-header>

          <app-list-display
            [headers]="headers"
            [columns]="columns"
            [items]="courses$ | async"
            [isAuthenticated]="isLoggedIn()"
            (deleteItem)="deleteCourse($event)"
            (editItem)="editCourse($event)"></app-list-display>
        </section>
      </section>
    </section>
  `,
  styles: [],
})
export default class CourseListComponent implements OnInit {
  readonly #authService = inject(AuthService);
  readonly #courseService = inject(CourseService);
  readonly #modal = inject(NgbModal);
  readonly #modalDataService = inject(ModalDataService);
  readonly #router = inject(Router);

  protected readonly columns = ['title', 'instructor', 'path', 'source'];
  protected readonly headers = ['Title', 'Instructor', 'Path', 'Source'];
  protected courses$: Observable<Course[]>;
  protected current = 1;
  protected isLoggedIn = this.#authService.isLoggedIn;
  protected readonly pageSize = 10;
  protected totalCourses$: Observable<number>;

  ngOnInit() {
    this.refreshTable();
    this.totalCourses$ = this.refreshTotal();
  }

  protected deleteCourse(id: number) {
    const modalOptions = {
      title: 'Are you sure you want to delete this course?',
      body: 'All information associated to this course will be permanently deleted.',
      warning: 'This operation cannot be undone.',
    };
    this.#modalDataService.setDeleteModalOptions(modalOptions);
    this.#modal.open(DeleteComponent).result.then((result) => {
      this.#courseService.delete(id);
      this.refreshTable();
    });
  }

  protected editCourse(id) {
    this.#router.navigate(['/courses', id]);
  }

  protected newCourse() {
    this.#router.navigate(['/courses/new']);
  }

  protected refreshTotal(): Observable<number> {
    return this.#courseService.getAll().pipe(map((courses: Course[]) => courses.length));
  }

  protected refreshTable() {
    this.courses$ = this.#courseService.getWithQuery({
      _sort: 'title',
      _order: 'asc',
      _page: `${this.current}`,
      _limit: `${this.pageSize}`,
    });
  }
}
