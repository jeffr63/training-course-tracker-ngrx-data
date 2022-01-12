import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import * as pathsActions from './paths.actions';
import { Path } from '../../shared/paths';
import { PathsEffects } from './paths.effects';
import { PathsService } from '../../services/paths.service';
import { State, initialState } from './paths.state';

const pathsService = jasmine.createSpyObj('pathsService', ['delete', 'get', 'load', 'save']);

describe(`Paths Effects`, () => {
  let actions$: Observable<any>;
  let effects: PathsEffects;
  let store: MockStore<State>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PathsEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
        { provide: PathsService, useValue: pathsService },
      ],
    });

    effects = TestBed.inject(PathsEffects);
    store = TestBed.inject(MockStore);
    store.setState(initialState);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe(`deletePath$ effect`, () => {
    it(`should return DeleteSuccess, with id, on success`, () => {
      const action = pathsActions.deletePath({ id: 1 });
      const completion = pathsActions.deletePathSuccess({ id: 1 });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: 1 });
        pathsService.delete.and.returnValue(response);

        expectObservable(effects.deletePath$).toBe('--c', { c: completion });
      });
    });

    it(`should return DeleteFail, with error, on failure`, () => {
      const error = 'Error';
      const action = pathsActions.deletePath({ id: 1 });
      const completion = pathsActions.deletePathFail({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        pathsService.delete.and.returnValue(response);

        expectObservable(effects.deletePath$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`getPath$ effect`, () => {
    it(`should return GetSuccess, with path, on success`, () => {
      const path: Path = { id: 1, name: 'ABC' };

      const action = pathsActions.getPath({ id: 1 });
      const completion = pathsActions.getPathSuccess({ path });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: path });
        pathsService.get.and.returnValue(response);

        expectObservable(effects.getPath$).toBe('--c', { c: completion });
      });
    });

    it(`should return GetFail, with error, on failure`, () => {
      const error = 'Error';
      const action = pathsActions.getPath({ id: 1 });
      const completion = pathsActions.getPathFail({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        pathsService.get.and.returnValue(response);

        expectObservable(effects.getPath$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`loadPaths$ effect`, () => {
    it(`should return LoadSuccess, with paths, on success`, () => {
      const paths = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' },
      ];

      const action = pathsActions.loadPaths();
      const completion = pathsActions.loadPathsSuccess({ paths });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: paths });
        pathsService.load.and.returnValue(response);

        expectObservable(effects.loadPaths$).toBe('--c', { c: completion });
      });
    });

    it(`should return LoadFail, with error, on failure`, () => {
      const error = 'Error';
      const action = pathsActions.loadPaths();
      const completion = pathsActions.loadPathsFail({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        pathsService.load.and.returnValue(response);

        expectObservable(effects.loadPaths$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`savePath$ effect`, () => {
    it(`should return SaveSuccess, with path, on success`, () => {
      const path: Path = { id: 1, name: 'ABC' };

      const action = pathsActions.savePath({ path });
      const load = pathsActions.loadPaths();
      const completion = pathsActions.savePathSuccess({ path });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: path });
        pathsService.save.and.returnValue(response);

        expectObservable(effects.savePath$).toBe('--(cd)', { c: load, d: completion });
      });
    });

    it(`should return SaveFail, with error, on failure`, () => {
      const path: Path = { id: 1, name: 'ABC' };
      const error = 'Error';
      const action = pathsActions.savePath({ path });
      const completion = pathsActions.savePathFail({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        pathsService.save.and.returnValue(response);

        expectObservable(effects.savePath$).toBe('--b', { b: completion });
      });
    });
  });
});
