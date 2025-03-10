import { Component, input } from '@angular/core';
import { CourseData } from '@models/course';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart-card',
  imports: [NgxChartsModule],
  template: `
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{ title() }}</h4>
        <ngx-charts-pie-chart [view]="[400, 400]" [results]="data()" [labels]="true" [doughnut]="true" [arcWidth]="0.5">
        </ngx-charts-pie-chart>
      </div>
    </div>
  `,
  styles: ``,
})
export class ChartCardComponent {
  data = input.required<CourseData[]>();
  title = input.required<string>();
}
