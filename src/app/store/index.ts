import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as courseReducer from './course/course.reducer';
import * as courseState from './course/course.state';
import * as pathsReducer from './paths/paths.reducer';
import * as pathsState from './paths/paths.state';
import * as sourcesReducer from './sources/sources.reducer';
import * as sourcesState from './sources/sources.state';

// import { environment } from '../../../environments/environment.prod';

export interface State {
  courses: courseState.State;
  paths: pathsState.State;
  sources: sourcesState.State;
}

export const reducers: ActionReducerMap<State> = {
  courses: courseReducer.reducer,
  paths: pathsReducer.reducer,
  sources: sourcesReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];
// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
