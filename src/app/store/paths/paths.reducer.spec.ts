import * as pathsActions from './paths.actions';
import { reducer } from './paths.reducer';
import { initialState } from './paths.state';
import { Path } from '../../shared/paths';

describe('Paths Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });

    describe('DELETE_FAIL action', () => {
      it(`should set error`, () => {
        const action = pathsActions.deletePathFail({ error: 'Error' });
        const state = reducer(initialState, action);

        expect(state.error).toEqual('Error');
        expect(state.paths).toEqual(initialState.paths);
        expect(state.currentPath).toEqual(initialState.currentPath);
      });
    });

    describe('DELETE_SUCCESS action', () => {
      const beforePaths: Path[] = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];
      const afterPaths: Path[] = [
        { id: 2, name: 'DEF' }
      ];
      const newState = {
        ...initialState,
        paths: beforePaths
      };
      it(`should clear error`, () => {
        const action = pathsActions.deletePathSuccess({ id: 1 });
        const state = reducer(newState, action);

        expect(state.error).toEqual('');
        expect(state.paths.length).toBe(1);
        expect(state.paths).toEqual(afterPaths);
        expect(state.currentPath).toEqual(initialState.currentPath);
      });
    });

    describe('GET_FAIL action', () => {
      it(`should clear currentPath and set error`, () => {
        const newState = {
          ...initialState,
          currentCourse: { id: 1, name: 'ABC' }
        };
        const action = pathsActions.getPathFail({ error: 'Error' });
        const state = reducer(newState, action);

        expect(state.currentPath).toEqual(null);
        expect(state.error).toEqual('Error');
        expect(state.paths).toEqual(newState.paths);
      });
    });

    describe('GET_SUCCESS action', () => {
      it(`should clear error`, () => {
        const path = { id: 1, name: 'ABC' };
        const action = pathsActions.getPathSuccess({ path });
        const state = reducer(initialState, action);

        expect(state.currentPath).toEqual(path);
        expect(state.error).toEqual('');
        expect(state.paths).toEqual(initialState.paths);
      });
    });

    describe(`LOAD_FAIL action`, () => {
      it(`should clear paths and set error`, () => {
        const action = pathsActions.loadPathsFail({ error: 'Error' });
        const state = reducer(initialState, action);

        expect(state.paths).toEqual([]);
        expect(state.error).toEqual('Error');
      });
    });

    describe(`LOAD_SUCCESS action`, () => {
      it(`should populate paths from the array and clear error`, () => {
        const paths: Path[] = [
          { id: 1, name: 'ABC' },
          { id: 2, name: 'DEF' }
        ];
        const action = pathsActions.loadPathsSuccess({ paths });
        const state = reducer(initialState, action);

        expect(state.paths).toEqual(paths);
        expect(state.error).toEqual('');

      });
    });

    describe(`SAVE_FAIL action`, () => {
      it(`should set error`, () => {
        const action = pathsActions.savePathFail({ error: 'Error' });
        const state = reducer(initialState, action);

        expect(state.error).toEqual('Error');
        expect(state.paths).toEqual(initialState.paths);
        expect(state.currentPath).toEqual(initialState.currentPath);
      });
    });

    describe('SAVE action', () => {
      it(`should update courses array with saved course information and clear error`, () => {
        const newState = {
          ...initialState,
          paths: [
            { id: 1, name: 'ABC' },
            { id: 2, name: 'DEF' }
          ]
        };
        const path = { id: 2, name: 'GHI' };
        const action = pathsActions.savePathSuccess({ path: path });
        const state = reducer(newState, action);

        expect(state.paths[0]).toEqual(newState.paths[0]);
        expect(state.paths[1]).toEqual(path);
        expect(state.error).toEqual('');
        expect(state.currentPath).toEqual(newState.currentPath);
      });
    });
  });
});
