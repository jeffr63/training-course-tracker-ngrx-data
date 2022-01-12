import { createAction, props } from '@ngrx/store';

import { Course } from '../../shared/course';

export const deleteCourse = createAction(
  '[Courses] Delete Course',
  props<{ 'id': number, 'current': number, 'pageSize': number }>()
);

export const deleteCourseFail = createAction(
  '[Courses] Delete Course Fail',
  props<{ error: string }>()
);

export const deleteCourseSuccess = createAction('[Courses] Delete Course Success');

export const getCourse = createAction(
  '[Courses] Get Course',
  props<{ id: number }>()
);

export const getCourseFail = createAction(
  '[Courses] Get Course Fail',
  props<{ error: string }>()
);

export const getCourseSuccess = createAction(
  '[Courses] Get Course Success',
  props<{ course: Course }>()
);

export const getTotalCourses = createAction('[Courses] Get Total Courses');

export const getTotalCoursesFail = createAction(
  '[Courses] Get Total Courses Fail',
  props<{ error: string }>()
);

export const getTotalCoursesSuccess = createAction(
  '[Courses] Get Total Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCourses = createAction(
  '[Courses] Load Courses',
  props<{ 'current': number, 'pageSize': number }>()
);

export const loadCoursesFail = createAction(
  '[Courses] Load Courses Fail',
  props<{ error: string }>()
);

export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[] }>()
);

export const saveCourse = createAction(
  '[Courses] Save Course',
  props<{ course: Course }>()
);

export const saveCourseFail = createAction(
  '[Courses] Save Course Fail',
  props<{ error: string }>()
);

export const saveCourseSuccess = createAction(
  '[Courses] Save Course Success',
  props<{ course: Course }>()
);
