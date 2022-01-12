import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import * as courseActions from './course.actions';
import { Course } from '../../shared/course';
import { CourseEffects } from './course.effects';
import { CoursesService } from '../../courses/courses.service';
import { State, initialState } from './course.state';

const coursesService = jasmine.createSpyObj('coursesService', [
  'deleteCourse',
  'getCourse',
  'getCourses',
  'getCoursesPaged',
  'saveCourse',
]);

describe(`Course Effects`, () => {
  let actions$: Observable<any>;
  let effects: CourseEffects;
  let store: MockStore<State>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
        { provide: CoursesService, useValue: coursesService },
      ],
    });

    effects = TestBed.inject(CourseEffects);
    store = TestBed.inject(MockStore);
    store.setState(initialState);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe(`deleteCourse$ effect`, () => {
    it(`should return DeleteSuccess, with course, on success`, () => {
      const action = courseActions.deleteCourse({
        id: 1,
        current: 1,
        pageSize: 3,
      });
      const load = courseActions.loadCourses({ current: 1, pageSize: 3 });
      const recount = courseActions.getTotalCourses();
      const completion = courseActions.deleteCourseSuccess();

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: 1 });
        coursesService.deleteCourse.and.returnValue(response);

        expectObservable(effects.deleteCourse$).toBe('--(cde)', { c: load, d: recount, e: completion });
      });
    });

    it(`should return DeleteFail, with error, on failure`, () => {
      const error = 'Error';
      const action = courseActions.deleteCourse({
        id: 1,
        current: 1,
        pageSize: 3,
      });
      const completion = courseActions.deleteCourseFail({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        coursesService.deleteCourse.and.returnValue(response);

        expectObservable(effects.deleteCourse$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`getCourse$ effect`, () => {
    it(`should return GetCourseSuccess, with course, on success`, () => {
      const course: Course = {
        id: 1,
        title: 'ABC',
        instructor: 'Joe',
        path: 'A',
        source: 'B',
      };

      const action = courseActions.getCourse({ id: 1 });
      const completion = courseActions.getCourseSuccess({ course });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: course });
        coursesService.getCourse.and.returnValue(response);

        expectObservable(effects.getCourse$).toBe('--c', { c: completion });
      });
    });

    it(`should return GetCourseFail, with error, on failure`, () => {
      const error = 'Error';
      const action = courseActions.getCourse({ id: 1 });
      const completion = courseActions.getCourseFail({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        coursesService.getCourse.and.returnValue(response);

        expectObservable(effects.getCourse$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`loadCourse$ effect`, () => {
    it(`should return LoadSuccess, with courses, on success`, () => {
      const courses: Course[] = [
        {
          id: 1,
          title: 'ABC',
          instructor: 'Joe',
          path: 'A',
          source: 'B',
        } as Course,
        {
          id: 1,
          title: 'DEF',
          instructor: 'Jack',
          path: 'A',
          source: 'B',
        } as Course,
      ];

      const action = courseActions.loadCourses({ current: 1, pageSize: 3 });
      const completion = courseActions.loadCoursesSuccess({ courses });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: courses });
        coursesService.getCoursesPaged.and.returnValue(response);

        expectObservable(effects.loadCourse$).toBe('--c', { c: completion });
      });
    });

    it(`should return LoadFail, with error, on failure`, () => {
      const error = 'Error';
      const action = courseActions.loadCourses({ current: 1, pageSize: 3 });
      const completion = courseActions.loadCoursesFail({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        coursesService.getCoursesPaged.and.returnValue(response);

        expectObservable(effects.loadCourse$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`saveCourse$ effect`, () => {
    it(`should return SaveSuccess, with course, on success`, () => {
      const course: Course = {
        id: 1,
        title: 'ABC',
        instructor: 'Joe',
        path: 'A',
        source: 'B',
      };

      const action = courseActions.saveCourse({ course });
      const recount = courseActions.getTotalCourses();
      const completion = courseActions.saveCourseSuccess({ course });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: course });
        coursesService.saveCourse.and.returnValue(response);

        expectObservable(effects.saveCourse$).toBe('--(cd)', { c: recount, d: completion });
      });
    });

    it(`should return SaveFail, with error, on failure`, () => {
      const course: Course = {
        id: 1,
        title: 'ABC',
        instructor: 'Joe',
        path: 'A',
        source: 'B',
      };
      const error = 'Error';
      const action = courseActions.saveCourse({ course });
      const completion = courseActions.saveCourseFail({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        coursesService.saveCourse.and.returnValue(response);

        expectObservable(effects.saveCourse$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`totalCourses$ effect`, () => {
    it(`should return GetTotalSuccess, with courses, on success`, () => {
      const courses: Course[] = [
        {
          id: 1,
          title: 'ABC',
          instructor: 'Joe',
          path: 'A',
          source: 'B',
        } as Course,
        {
          id: 1,
          title: 'DEF',
          instructor: 'Jack',
          path: 'A',
          source: 'B',
        } as Course,
      ];

      const action = courseActions.getTotalCourses();
      const completion = courseActions.getTotalCoursesSuccess({ courses });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: courses });
        coursesService.getCourses.and.returnValue(response);

        expectObservable(effects.totalCourses$).toBe('--c', { c: completion });
      });
    });

    it(`should return GetTotalFail, with error, on failure`, () => {
      const error = 'Error';
      const action = courseActions.getTotalCourses();
      const completion = courseActions.getTotalCoursesFail({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        coursesService.getCourses.and.returnValue(response);

        expectObservable(effects.totalCourses$).toBe('--b', { b: completion });
      });
    });
  });
});
