import * as pathActions from './paths.actions';

describe('Paths Actions', () => {

  describe('DeletePath', () => {
    it(`should create an action`, () => {
      const id = 1;
      const action = pathActions.deletePath({ id });

      expect({ ...action }).toEqual({
        type: '[Paths] Delete Path',
        id
      });
    });
  });

  describe('DeletePathFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = pathActions.deletePathFail({ error });

      expect({ ...action }).toEqual({
        type: '[Paths] Delete Path Fail',
        error
      });
    });
  });

  describe('DeletePathSuccess', () => {
    it(`should create an action`, () => {
      const id = 1;
      const action = pathActions.deletePathSuccess({ id });

      expect({ ...action }).toEqual({
        type: '[Paths] Delete Path Success',
        id
      });
    });
  });

  describe('GetPath', () => {
    it(`should create an action`, () => {
      const id = 1;
      const action = pathActions.getPath({ id });

      expect({ ...action }).toEqual({
        type: '[Paths] Get Path',
        id
      });
    });
  });

  describe('GetPathFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = pathActions.getPathFail({ error });

      expect({ ...action }).toEqual({
        type: '[Paths] Get Path Fail',
        error
      });
    });
  });

  describe('GetPathSuccess', () => {
    it(`should create an action`, () => {
      const path = { id: 1, name: 'ABC' };
      const action = pathActions.getPathSuccess({ path });

      expect({ ...action }).toEqual({
        type: '[Paths] Get Path Success',
        path
      });
    });
  });

  describe('LoadPaths', () => {
    it(`should create an action`, () => {
      const action = pathActions.loadPaths();

      expect({ ...action }).toEqual({
        type: '[Paths] Load Paths'
      });
    });
  });

  describe('LoadPathsFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = pathActions.loadPathsFail({ error });

      expect({ ...action }).toEqual({
        type: '[Paths] Load Paths Fail',
        error
      });
    });
  });

  describe('LoadPathsSuccess', () => {
    it(`should create an action`, () => {
      const paths = [
        { id: 1, name: 'ABC' },
        { id: 2, name: 'DEF' }
      ];
      const action = pathActions.loadPathsSuccess({ paths });

      expect({ ...action }).toEqual({
        type: '[Paths] Load Paths Success',
        paths
      });
    });
  });

  describe('SavePath', () => {
    it(`should create an action`, () => {
      const path = { id: 1, name: 'ABC' };
      const action = pathActions.savePath({ path });

      expect({ ...action }).toEqual({
        type: '[Paths] Save Path',
        path
      });
    });
  });

  describe('SavePathFail', () => {
    it(`should create an action`, () => {
      const error = 'Error';
      const action = pathActions.savePathFail({ error });

      expect({ ...action }).toEqual({
        type: '[Paths] Save Path Fail',
        error
      });
    });
  });

  describe('SavePathSuccess', () => {
    it(`should create an action`, () => {
      const path = { id: 1, name: 'ABC' };
      const action = pathActions.savePathSuccess({ path });

      expect({ ...action }).toEqual({
        type: '[Paths] Save Path Success',
        path
      });
    });
  });
});
