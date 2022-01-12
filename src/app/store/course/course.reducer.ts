import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';

import * as courseActions from './course.actions';
import { State, initialState } from './course.state';
import { Course, CourseData } from '../../shared/course';

export const reducer = createReducer(
  initialState,
  on(courseActions.deleteCourseFail, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(courseActions.deleteCourseSuccess, (state) => ({
    ...state,
    error: '',
  })),
  on(courseActions.getCourseFail, (state, { error }) => ({
    ...state,
    currentCourse: null,
    error: error,
  })),
  on(courseActions.getCourseSuccess, (state, { course }) => ({
    ...state,
    currentCourse: course,
    error: '',
  })),
  on(courseActions.loadCoursesFail, (state, { error }) => ({
    ...state,
    courses: [],
    error: error,
  })),
  on(courseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses: courses,
    error: '',
  })),
  on(courseActions.saveCourseFail, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(courseActions.saveCourseSuccess, (state, { course }) => ({
    ...state,
    courses: state.courses.map((item) => (course.id === item.id ? course : item)),
    error: '',
  })),
  on(courseActions.getTotalCoursesFail, (state, { error }) => ({
    ...state,
    totalCourses: 0,
    error: error,
  })),
  on(courseActions.getTotalCoursesSuccess, (state, { courses }) => ({
    ...state,
    totalCourses: courses.length,
    coursesByPath: getByPathValue(courses),
    coursesBySource: getBySourceValue(courses),
    error: '',
  }))
);

function getByPathValue(courses: Course[]): CourseData[] {
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

function getBySourceValue(course: Course[]): CourseData[] {
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

//export const getCourses = (state: State) => state.courses;
//export const getCurrentCourse = (state: State) => state.currentCourse;
//export const getTotalCourses = (state: State) => state.totalCourses;
//export const getError = (state: State) => state.error;
