import { Component, OnInit, computed, inject } from '@angular/core';

import * as _ from 'lodash';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { Course, CourseData } from '@models/course';
import { CourseService } from '@services/course.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxChartsModule],

  template: `
    <section>
      <div class="container-fluid">
        <div class="row first-row">
          <div class="card col-xm-12 col-sm-6">
            <div class="card-body">
              <h4 class="card-title">Completed Courses - Paths</h4>
              <ngx-charts-pie-chart
                [view]="[400, 400]"
                [results]="courses()"
                [labels]="true"
                [doughnut]="true"
                [arcWidth]="0.5"
              >
              </ngx-charts-pie-chart>
            </div>
          </div>

          <div class="card col-xm-12 col-sm-6">
            <div class="card-body">
              <h4 class="card-title">Completed Courses - Sources</h4>
              <ngx-charts-pie-chart
                [view]="[400, 400]"
                [results]="sources()"
                [labels]="true"
                [doughnut]="true"
                [arcWidth]="0.5"
              >
              </ngx-charts-pie-chart>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,

  styles: [],
})
export class DashboardComponent implements OnInit {
  private courseService = inject(CourseService);

  #courses = toSignal(this.courseService.entities$);
  courses = computed(() => this.getByPathValue(this.#courses()));
  sources = computed(() => this.getBySourceValue(this.#courses()));

  ngOnInit() {
    this.courseService.getAll();
  }

  getByPathValue(courses: Course[]): CourseData[] {
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

  getBySourceValue(course: Course[]): CourseData[] {
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
