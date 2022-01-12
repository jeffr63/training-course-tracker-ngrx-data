import * as sourcesActions from './sources.actions';

describe('Sources Actions', () => {
  describe('Delete Source', () => {
    it(`should create an action`, () => {
      const id = 1;
      const action = sourcesActions.deleteSource({ id });

      expect({ ...action }).toEqual({
        type: '[Sources] Delete Source',
        id
      });
    });
  });

  describe('DeleteSourceFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = sourcesActions.deleteSourceFail({ error });

      expect({ ...action }).toEqual({
        type: '[Sources] Delete Source Fail',
        error
      });
    });
  });

  describe('DeleteSourceSuccess', () => {
    it(`should create an action`, () => {
      const id = 1;
      const action = sourcesActions.deleteSourceSuccess({ id });

      expect({ ...action }).toEqual({
        type: '[Sources] Delete Source Success',
        id
      });
    });
  });

  describe('GetSource', () => {
    it(`should create an action`, () => {
      const id = 1;
      const action = sourcesActions.getSource({ id });

      expect({ ...action }).toEqual({
        type: '[Sources] Get Source',
        id
      });
    });
  });

  describe('GetSourceFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = sourcesActions.getSourceFail({ error });

      expect({ ...action }).toEqual({
        type: '[Sources] Get Source Fail',
        error
      });
    });
  });

  describe('GetSourceSuccess', () => {
    it(`should create an action`, () => {
      const source = { id: 1, name: 'ABC' };
      const action = sourcesActions.getSourceSuccess({ source });

      expect({ ...action }).toEqual({
        type: '[Sources] Get Source Success',
        source
      });
    });
  });

  describe('LoadSources', () => {
    it(`should create an action`, () => {
      const action = sourcesActions.loadSources();

      expect({ ...action }).toEqual({
        type: '[Sources] Load Sources'
      });
    });
  });

  describe('LoadSourceFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = sourcesActions.loadSourcesFail({ error });

      expect({ ...action }).toEqual({
        type: '[Sources] Load Sources Fail',
        error
      });
    });
  });

  describe('LoadSourcesSuccess', () => {
    it(`should create an action`, () => {
      const sources = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];
      const action = sourcesActions.loadSourcesSuccess({ sources });

      expect({ ...action }).toEqual({
        type: '[Sources] Load Sources Success',
        sources
      });
    });
  });

  describe('SaveSource', () => {
    it(`should create an action`, () => {
      const source = { id: 1, name: 'ABC' };
      const action = sourcesActions.saveSource({ source });

      expect({ ...action }).toEqual({
        type: '[Sources] Save Source',
        source
      });
    });
  });

  describe('SaveSourceFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = sourcesActions.saveSourceFail({ error });

      expect({ ...action }).toEqual({
        type: '[Sources] Save Source Fail',
        error
      });
    });
  });

  describe('SaveSourceSuccess', () => {
    it(`should create an action`, () => {
      const source = { id: 1, name: 'ABC' };
      const action = sourcesActions.saveSourceSuccess({ source });

      expect({ ...action }).toEqual({
        type: '[Sources] Save Source Success',
        source
      });
    });
  });
});
