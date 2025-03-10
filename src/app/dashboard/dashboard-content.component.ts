import { Component, input } from '@angular/core';

import { ChartCardComponent } from '@shared/components/chart-card.component';
import { CourseData } from '@models/course';

@Component({
  selector: 'app-dashboard-content',
  imports: [ChartCardComponent],
  template: `
    <section>
      <div class="container-fluid">
        <div class="row first-row">
          <div class="col-xm-12 col-sm-6">
            <app-chart-card [data]="paths()" title="Completed Courses - Paths" />
          </div>
          <div class="col-xm-12 col-sm-6">
            <app-chart-card [data]="sources()" title="Completed Courses - Sources" />
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class DashboardContentComponent {
  paths = input.required<CourseData[]>();
  sources = input.required<CourseData[]>();
}
