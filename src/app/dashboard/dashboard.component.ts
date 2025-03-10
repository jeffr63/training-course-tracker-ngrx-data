import { Component, OnInit, computed, inject } from '@angular/core';

import * as _ from 'lodash';

import { Course, CourseData } from '@models/course';
import { CourseService } from '@shared/services/course/course.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DashboardContentComponent } from './dashboard-content.component';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardContentComponent],
  template: `<app-dashboard-content [paths]="paths()" [sources]="sources()" />`,
  styles: [],
})
export class DashboardComponent implements OnInit {
  readonly #courseService = inject(CourseService);

  readonly #courses = toSignal(this.#courseService.entities$);
  protected readonly paths = computed(() => this.getByPathValue(this.#courses()));
  protected readonly sources = computed(() => this.getBySourceValue(this.#courses()));

  ngOnInit() {
    this.#courseService.getAll();
  }

  protected getByPathValue(courses: Course[]): CourseData[] {
    let byPath = _.chain(courses)
      .groupBy('path')
      .map((values, key) => {
        return {
          name: key,
          value: _.reduce(
            values,
            function (value, number) {
              return value + 1;
            },
            0
          ),
        };
      })
      .value();
    byPath = _.orderBy(byPath, 'value', 'desc');
    return byPath;
  }

  protected getBySourceValue(course: Course[]): CourseData[] {
    let bySource = _.chain(course)
      .groupBy('source')
      .map((values, key) => {
        return {
          name: key,
          value: _.reduce(
            values,
            function (value, number) {
              return value + 1;
            },
            0
          ),
        };
      })
      .value();
    bySource = _.orderBy(bySource, 'value', 'desc');
    return bySource;
  }
}
