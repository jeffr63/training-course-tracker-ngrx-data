import { createReducer, on } from '@ngrx/store';

import * as pathsActions from './paths.actions';
import { State, initialState } from './paths.state';

export const reducer = createReducer(
  initialState,
  on(pathsActions.deletePathFail, (state, { error }) => ({
    ...state,
    currentPath: null,
    error: error,
  })),
  on(pathsActions.deletePathSuccess, (state, { id }) => ({
    ...state,
    currentPath: null,
    error: '',
    paths: state.paths.filter((path) => path.id !== id),
  })),
  on(pathsActions.getPathFail, (state, { error }) => ({
    ...state,
    currentPath: null,
    error: error,
  })),
  on(pathsActions.getPathSuccess, (state, { path }) => ({
    ...state,
    currentPath: path,
    error: '',
  })),
  on(pathsActions.loadPathsFail, (state, { error }) => ({
    ...state,
    paths: [],
    error: error,
  })),
  on(pathsActions.loadPathsSuccess, (state, { paths }) => ({
    ...state,
    paths: paths,
    error: '',
  })),
  on(pathsActions.savePathFail, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(pathsActions.savePathSuccess, (state, { path }) => ({
    ...state,
    paths: state.paths.map((item) => (path.id === item.id ? path : item)),
    currentPath: null,
    error: '',
  }))
);

//export const getPaths = (state: State) => state.paths;
//export const getError = (state: State) => state.error;
//export const getCurrentPath = (state: State) => state.currentPath;
