import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CourseData } from '../shared/course';
import { DashboardComponent } from './dashboard.component';
import { DOMHelperRoutines } from '../../testing/dom.helpers';
import { getCoursesByPath, getCoursesBySource } from '../store/course/course.selectors';
import { initialState } from '../store/course/course.state';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let dh: DOMHelperRoutines<DashboardComponent>;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DashboardComponent],
        imports: [BrowserAnimationsModule, NgxChartsModule],
        providers: [provideMockStore({ initialState })],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    dh = new DOMHelperRoutines(fixture);
  });

  describe('HTML test', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should contain one section tag', () => {
      expect(dh.queryAllCount('section')).toBe(1);
    });

    it('should contain a h4 tag for paths', () => {
      const elements = dh.queryAll('h4');
      expect(elements[0].nativeElement.textContent).toBe('Completed Courses - Paths');
    });

    it('should contain a h4 tag for sources', () => {
      const elements = dh.queryAll('h4');
      expect(elements[1].nativeElement.textContent).toBe('Completed Courses - Sources');
    });

    it('should contain two charts', () => {
      expect(dh.queryAllCount('ngx-charts-pie-chart')).toBe(2);
    });
  });

  describe('NgOnInit', () => {
    it('should declare the courses observable property', () => {
      const paths: CourseData[] = [
        { name: 'Angular', value: 10 },
        { name: 'React', value: 2 },
      ];
      store.overrideSelector(getCoursesByPath, paths);
      fixture.detectChanges();
      component.courses$.subscribe((value) => {
        expect(value).toEqual(paths);
      });
    });

    it('should declare the sourses observable property', () => {
      const sources: CourseData[] = [
        { name: 'Pluralite', value: 8 },
        { name: 'YouTube', value: 4 },
      ];
      store.overrideSelector(getCoursesBySource, sources);
      fixture.detectChanges();
      component.sources$.subscribe((value) => {
        expect(value).toEqual(sources);
      });
    });
  });
});
