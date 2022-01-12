import * as sourcesActions from './sources.actions';
import { reducer } from './sources.reducer';
import { initialState } from './sources.state';
import { Source } from '../../shared/sources';
import { getCurrentSource, getError, getSources } from './sources.selectors';

describe('Sources Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });

    describe('DELETE_FAIL action', () => {
      it(`should set error`, () => {
        const action = sourcesActions.deleteSourceFail({ error: 'Error' });
        const state = reducer(initialState, action);

        expect(state.error).toEqual('Error');
        expect(state.sources).toEqual(initialState.sources);
        expect(state.currentSource).toEqual(initialState.currentSource);
      });
    });

    describe('DELETE_SUCCESS action', () => {
      const beforeSources: Source[] = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' },
      ];
      const afterSources: Source[] = [{ id: 2, name: 'DEF' }];
      const newState = {
        ...initialState,
        sources: beforeSources,
      };
      it(`should clear error`, () => {
        const action = sourcesActions.deleteSourceSuccess({ id: 1 });
        const state = reducer(newState, action);

        expect(state.error).toEqual('');
        expect(state.sources.length).toBe(1);
        expect(state.sources).toEqual(afterSources);
        expect(state.currentSource).toEqual(initialState.currentSource);
      });
    });

    describe('GET_FAIL action', () => {
      it(`should clear currentSource and set error`, () => {
        const newState = {
          ...initialState,
          currentCourse: { id: 1, name: 'ABC' },
        };
        const action = sourcesActions.getSourceFail({ error: 'Error' });
        const state = reducer(newState, action);

        expect(state.currentSource).toEqual(null);
        expect(state.error).toEqual('Error');
        expect(state.sources).toEqual(newState.sources);
      });
    });

    describe('GET_SUCCESS action', () => {
      it(`should clear error`, () => {
        const source = { id: 1, name: 'ABC' };
        const action = sourcesActions.getSourceSuccess({ source });
        const state = reducer(initialState, action);

        expect(state.currentSource).toEqual(source);
        expect(state.error).toEqual('');
        expect(state.sources).toEqual(initialState.sources);
      });
    });

    describe(`LOAD_FAIL action`, () => {
      it(`should clear sources and set error`, () => {
        const action = sourcesActions.loadSourcesFail({ error: 'Error' });
        const state = reducer(initialState, action);

        expect(state.sources).toEqual([]);
        expect(state.error).toEqual('Error');
      });
    });

    describe(`LOAD_SUCCESS action`, () => {
      it(`should populate sources from the array and clear error`, () => {
        const sources: Source[] = [
          { id: 1, name: 'ABC' },
          { id: 2, name: 'DEF' },
        ];
        const action = sourcesActions.loadSourcesSuccess({ sources });
        const state = reducer(initialState, action);

        expect(state.sources).toEqual(sources);
        expect(state.error).toEqual('');
      });
    });

    describe(`SAVE_FAIL action`, () => {
      it(`should set error`, () => {
        const action = sourcesActions.saveSourceFail({ error: 'Error' });
        const state = reducer(initialState, action);

        expect(state.error).toEqual('Error');
        expect(state.sources).toEqual(initialState.sources);
        expect(state.currentSource).toEqual(initialState.currentSource);
      });
    });

    describe('SAVE action', () => {
      it(`should update courses array with saved course information and clear error`, () => {
        const newState = {
          ...initialState,
          sources: [
            { id: 1, name: 'ABC' },
            { id: 2, name: 'DEF' },
          ],
        };
        const source = { id: 2, name: 'GHI' };
        const action = sourcesActions.saveSourceSuccess({ source });
        const state = reducer(newState, action);

        expect(state.sources[0]).toEqual(newState.sources[0]);
        expect(state.sources[1]).toEqual(source);
        expect(state.error).toEqual('');
        expect(state.currentSource).toEqual(newState.currentSource);
      });
    });
  });
});
