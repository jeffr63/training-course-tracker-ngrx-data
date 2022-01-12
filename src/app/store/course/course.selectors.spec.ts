import {
  getCourses,
  getCourse,
  getCurrentCourse,
  getCoursesByPath,
  getCoursesBySource,
  getError,
  getTotalCourses,
  saveCourse,
} from './course.selectors';
import { initialState } from './course.state';
import { Course, CourseData } from '../../shared/course';

describe(`Course Selectors`, () => {
  describe(`getCourses selector`, () => {
    it('should return courses', () => {
      const courses: Course[] = [
        { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B' },
        { id: 2, title: 'Course 2', instructor: 'Jack', path: 'C', source: 'D' },
      ];
      const previousState = {
        courses: {
          ...initialState,
          courses,
        },
      };

      const payload = getCourses(previousState);

      expect(payload).toEqual(courses);
    });
  });

  describe(`getCourse selector`, () => {
    it('should return currentCourse', () => {
      const currentCourse: Course = { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B' };
      const previousState = {
        courses: {
          ...initialState,
          currentCourse,
        },
      };

      const payload = getCourse(previousState);

      expect(payload).toEqual(currentCourse);
    });
  });

  describe(`getCurrentCourse selector`, () => {
    it('should return currentCourse', () => {
      const currentCourse: Course = { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B' };
      const previousState = {
        courses: {
          ...initialState,
          currentCourse,
        },
      };

      const payload = getCurrentCourse(previousState);

      expect(payload).toEqual(currentCourse);
    });
  });

  describe(`getCoursesByPath selector`, () => {
    it('should return array of course data', () => {
      const byPath: CourseData[] = [
        { name: 'ABC', value: 1 },
        { name: 'DEF', value: 2 },
      ];
      const previousState = {
        courses: {
          ...initialState,
          coursesByPath: byPath,
        },
      };

      const payload = getCoursesByPath(previousState);

      expect(payload).toEqual(byPath);
    });
  });

  describe(`getCoursesBySource selector`, () => {
    it('should return array of course data', () => {
      const bySource: CourseData[] = [
        { name: 'ABC', value: 1 },
        { name: 'DEF', value: 2 },
      ];
      const previousState = {
        courses: {
          ...initialState,
          coursesBySource: bySource,
        },
      };

      const payload = getCoursesBySource(previousState);

      expect(payload).toEqual(bySource);
    });
  });

  describe(`getError selector`, () => {
    it('should return error', () => {
      const error = 'Error';
      const previousState = {
        courses: {
          ...initialState,
          error,
        },
      };

      const payload = getError(previousState);

      expect(payload).toEqual(error);
    });
  });

  describe(`getTotalCourses selector`, () => {
    it('should return totalCourses', () => {
      const totalCourses = 10;
      const previousState = {
        courses: {
          ...initialState,
          totalCourses,
        },
      };

      const payload = getTotalCourses(previousState);

      expect(payload).toEqual(totalCourses);
    });
  });

  describe(`saveCourse selector`, () => {
    it('should return currentCourse', () => {
      const currentCourse: Course = { id: 1, title: 'Course 1', instructor: 'Joe', path: 'A', source: 'B' };
      const previousState = {
        courses: {
          ...initialState,
          currentCourse,
        },
      };

      const payload = saveCourse(previousState);

      expect(payload).toEqual(currentCourse);
    });
  });
});
