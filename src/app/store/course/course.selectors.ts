import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './course.state';

// course selectors
const getCourseFeatureState = createFeatureSelector<State>('courses');

export const getCourse = createSelector(getCourseFeatureState, (state: State) => state.currentCourse);

export const getCourses = createSelector(getCourseFeatureState, (state: State) => {
  console.log(state);
  return state.courses;
});

export const getCoursesByPath = createSelector(getCourseFeatureState, (state: State) => state.coursesByPath);

export const getCoursesBySource = createSelector(getCourseFeatureState, (state: State) => state.coursesBySource);

export const getCurrentCourse = createSelector(getCourseFeatureState, (state: State) => state.currentCourse);

export const getError = createSelector(getCourseFeatureState, (state: State) => state.error);

export const getTotalCourses = createSelector(getCourseFeatureState, (state: State) => state.totalCourses);

export const saveCourse = createSelector(getCourseFeatureState, (state: State) => state.currentCourse);
