import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as courseReducer from './course/course.reducer';
import * as courseState from './course/course.state';

// import { environment } from '../../../environments/environment.prod';

export interface State {
  courses: courseState.State;
}

export const reducers: ActionReducerMap<State> = {
  courses: courseReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];
// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
