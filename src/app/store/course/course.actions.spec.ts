import * as courseActions from './course.actions';

describe('Courses Actions', () => {

  describe('DeleteCourse', () => {
    it(`should create an action`, () => {
      const id = 1
      const current = 1
      const pageSize = 3
      const action = courseActions.deleteCourse({ id, current, pageSize });

      expect({ ...action }).toEqual({
        type: '[Courses] Delete Course',
        id,
        current,
        pageSize
      });
    });
  });

  describe('DeleteCourseFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = courseActions.deleteCourseFail({ error });

      expect({ ...action }).toEqual({
        type: '[Courses] Delete Course Fail',
        error
      });
    });
  });

  describe('DeleteCourseSuccess', () => {
    it(`should create an action`, () => {
      const action = courseActions.deleteCourseSuccess();

      expect({ ...action }).toEqual({
        type: '[Courses] Delete Course Success'
      });
    });
  });

  describe('GetCourse', () => {
    it(`should create an action`, () => {
      const id = 1;
      const action = courseActions.getCourse({ id });

      expect({ ...action }).toEqual({
        type: '[Courses] Get Course',
        id
      });
    });
  });

  describe('GetCourseFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = courseActions.getCourseFail({ error });

      expect({ ...action }).toEqual({
        type: '[Courses] Get Course Fail',
        error
      });
    });
  });

  describe('GetCourseSuccess', () => {
    it(`should create an action`, () => {
      const course = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B' };
      const action = courseActions.getCourseSuccess({ course });

      expect({ ...action }).toEqual({
        type: '[Courses] Get Course Success',
        course
      });
    });
  });

  describe('GetTotalCourses', () => {
    it(`should create an action`, () => {
      const action = courseActions.getTotalCourses();

      expect({ ...action }).toEqual({
        type: '[Courses] Get Total Courses'
      });
    });
  });

  describe('GetTotalCoursesFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = courseActions.getTotalCoursesFail({ error });

      expect({ ...action }).toEqual({
        type: '[Courses] Get Total Courses Fail',
        error
      });
    });
  });

  describe('GetTotalCoursesSuccess', () => {
    it(`should create an action`, () => {
      const courses = [
        { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' },
        { id: 2, title: 'DEF', instructor: 'Jack', path: 'A', source: 'B', yearCompleted: '2019' }
      ];
      const action = courseActions.getTotalCoursesSuccess({ courses });

      expect({ ...action }).toEqual({
        type: '[Courses] Get Total Courses Success',
        courses
      });
    });
  });

  describe('LoadCourse', () => {
    it(`should create an action`, () => {
      const current = 1
      const pageSize = 3
      const action = courseActions.loadCourses({ current, pageSize });

      expect({ ...action }).toEqual({
        type: '[Courses] Load Courses',
        current,
        pageSize
      });
    });
  });

  describe('LoadCoursesFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = courseActions.loadCoursesFail({ error });

      expect({ ...action }).toEqual({
        type: '[Courses] Load Courses Fail',
        error
      });
    });
  });

  describe('LoadCoursesSuccess', () => {
    it(`should create an action`, () => {
      const courses = [
        { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' },
        { id: 2, title: 'DEF', instructor: 'Jack', path: 'A', source: 'B', yearCompleted: '2019' }
      ];
      const action = courseActions.loadCoursesSuccess({ courses });

      expect({ ...action }).toEqual({
        type: '[Courses] Load Courses Success',
        courses
      });
    });
  });

  describe('SaveCourse', () => {
    it(`should create an action`, () => {
      const course = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' };
      const action = courseActions.saveCourse({ course });

      expect({ ...action }).toEqual({
        type: '[Courses] Save Course',
        course
      });
    });
  });

  describe('SaveCourseFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = courseActions.saveCourseFail({ error });

      expect({ ...action }).toEqual({
        type: '[Courses] Save Course Fail',
        error
      });
    });
  });

  describe('SaveCourseSuccess', () => {
    it(`should create an action`, () => {
      const course = { id: 1, title: 'ABC', instructor: 'John', path: 'A', source: 'B', yearCompleted: '2019' };
      const action = courseActions.saveCourseSuccess({ course });

      expect({ ...action }).toEqual({
        type: '[Courses] Save Course Success',
        course
      });
    });
  });
});
