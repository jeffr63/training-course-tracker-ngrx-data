import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './paths.state';

// paths selectors
export const selectPathsState = createFeatureSelector<State>('paths');

export const getCurrentPath = createSelector(selectPathsState, (state: State) => state.currentPath);

export const getError = createSelector(selectPathsState, (state: State) => state.error);

export const getPaths = createSelector(selectPathsState, (state: State) => state.paths);
