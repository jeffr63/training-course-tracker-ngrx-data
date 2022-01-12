import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './sources.state';

// sources selectors
export const selectSourcesState = createFeatureSelector<State>('sources');

export const getCurrentSource = createSelector(selectSourcesState, (state: State) => state.currentSource);

export const getError = createSelector(selectSourcesState, (state: State) => state.error);

export const getSources = createSelector(selectSourcesState, (state: State) => state.sources);
