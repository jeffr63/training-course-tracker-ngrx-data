import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import * as sourcesActions from './sources.actions';
import { Source } from '../../shared/sources';
import { SourcesEffects } from './sources.effects';
import { SourcesService } from '../../services/sources.service';
import { State, initialState } from './sources.state';

const sourcesService = jasmine.createSpyObj('sourcesService', ['delete', 'get', 'load', 'save']);

describe(`Sources Effects`, () => {
  let actions$: Observable<any>;
  let effects: SourcesEffects;
  let store: MockStore<State>;
  let testScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SourcesEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
        { provide: SourcesService, useValue: sourcesService },
      ],
    });

    effects = TestBed.inject(SourcesEffects);
    store = TestBed.inject(MockStore);
    store.setState(initialState);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe(`deleteSource$ effect`, () => {
    it(`should return DeleteSourceSuccess, with id, on success`, () => {
      const action = sourcesActions.deleteSource({ id: 1 });
      const completion = sourcesActions.deleteSourceSuccess({ id: 1 });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: 1 });
        sourcesService.delete.and.returnValue(response);

        expectObservable(effects.deleteSource$).toBe('--c', { c: completion });
      });
    });

    it(`should return DeleteSourceFail, with error, on failure`, () => {
      const error = 'Error';
      const action = sourcesActions.deleteSource({ id: 1 });
      const completion = sourcesActions.deleteSourceFail({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        sourcesService.delete.and.returnValue(response);

        expectObservable(effects.deleteSource$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`getSource$ effect`, () => {
    it(`should return GetSourceSuccess, with source, on success`, () => {
      const source: Source = { id: 1, name: 'ABC' };

      const action = sourcesActions.getSource({ id: 1 });
      const completion = sourcesActions.getSourceSuccess({ source });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: source });
        sourcesService.get.and.returnValue(response);

        expectObservable(effects.getSource$).toBe('--c', { c: completion });
      });
    });

    it(`should return GetSourceFail, with error, on failure`, () => {
      const error = 'Error';
      const action = sourcesActions.getSource({ id: 1 });
      const completion = sourcesActions.getSourceFail({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        sourcesService.get.and.returnValue(response);

        expectObservable(effects.getSource$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`loadSource$ effect`, () => {
    it(`should return LoadSuccess, with sources, on success`, () => {
      const sources: Source[] = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' },
      ];

      const action = sourcesActions.loadSources();
      const completion = sourcesActions.loadSourcesSuccess({ sources });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: sources });
        sourcesService.load.and.returnValue(response);

        expectObservable(effects.loadSources$).toBe('--c', { c: completion });
      });
    });

    it(`should return LoadFail, with error, on failure`, () => {
      const error = 'Error';
      const action = sourcesActions.loadSources();
      const completion = sourcesActions.loadSourcesFail({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        sourcesService.load.and.returnValue(response);

        expectObservable(effects.loadSources$).toBe('--b', { b: completion });
      });
    });
  });

  describe(`saveSource$ effect`, () => {
    it(`should return SaveSuccess, with source, on success`, () => {
      const source: Source = { id: 1, name: 'ABC' };

      const action = sourcesActions.saveSource({ source });
      const load = sourcesActions.loadSources();
      const completion = sourcesActions.saveSourceSuccess({ source });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-b|', { b: source });
        sourcesService.save.and.returnValue(response);

        expectObservable(effects.saveSource$).toBe('--(cd)', { c: load, d: completion });
      });
    });

    it(`should return SaveFail, with error, on failure`, () => {
      const source: Source = { id: 1, name: 'ABC' };
      const error = 'Error';
      const action = sourcesActions.saveSource({ source });
      const completion = sourcesActions.saveSourceFail({ error });

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions$ = hot('-a', { a: action });
        const response = cold('-#|', {}, error);
        sourcesService.save.and.returnValue(response);

        expectObservable(effects.saveSource$).toBe('--b', { b: completion });
      });
    });
  });
});
