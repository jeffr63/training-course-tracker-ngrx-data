import { getCurrentPath, getError, getPaths } from './paths.selectors';
import { initialState } from './paths.state';
import { Path } from '../../shared/paths';

describe(`Paths Selectors`, () => {
  describe(`getCurrentPath selector`, () => {
    it('should return path', () => {
      const currentPath: Path = { id: 1, name: 'ABC' };
      const previousState = {
        paths: {
          ...initialState,
          currentPath,
        },
      };

      const payload = getCurrentPath(previousState);

      expect(payload).toEqual(currentPath);
    });
  });

  describe(`getError selector`, () => {
    it('should return error', () => {
      const error = 'Error';
      const previousState = {
        paths: {
          ...initialState,
          error,
        },
      };

      const payload = getError(previousState);

      expect(payload).toEqual(error);
    });
  });

  describe(`getPaths selector`, () => {
    it('should return paths', () => {
      const paths: Path[] = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' },
      ];
      const previousState = {
        paths: {
          ...initialState,
          paths,
        },
      };

      const payload = getPaths(previousState);

      expect(payload).toEqual(paths);
    });
  });
});
