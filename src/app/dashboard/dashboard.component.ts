import { Component, OnInit, inject } from '@angular/core';

import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { Course, CourseData } from '@models/course';
import { CourseService } from '@services/course.service';

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
                [results]="courses$ | async"
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
                [results]="sources$ | async"
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
  courseService = inject(CourseService);

  courses$: Observable<CourseData[]>;
  sources$: Observable<CourseData[]>;

  ngOnInit() {
    this.courseService.getAll().subscribe((courses: Course[]) => {
      this.courses$ = this.getByPathValue(courses);
      this.sources$ = this.getBySourceValue(courses);
    });
  }

  getByPathValue(courses: Course[]): Observable<CourseData[]> {
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
    return of(byPath);
  }

  getBySourceValue(course: Course[]): Observable<CourseData[]> {
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
    return of(bySource);
  }
}
