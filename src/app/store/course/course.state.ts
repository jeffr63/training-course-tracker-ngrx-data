import { Course, CourseData } from '../../shared/course';

export interface State {
  courses: Course[];
  currentCourse: Course;
  totalCourses: number;
  coursesByPath: CourseData[];
  coursesBySource: CourseData[];
  error: string;
}

export const initialState: State = {
  courses: [],
  currentCourse: null,
  totalCourses: 0,
  coursesByPath: [],
  coursesBySource: [],
  error: '',
};
