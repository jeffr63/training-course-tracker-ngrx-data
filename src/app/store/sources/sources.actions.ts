import { props, createAction } from '@ngrx/store';

import { Source } from '../../shared/sources';

export const deleteSource = createAction(
  '[Sources] Delete Source',
  props<{ id: number }>()
);

export const deleteSourceFail = createAction(
  '[Sources] Delete Source Fail',
  props<{ error: string }>()
);

export const deleteSourceSuccess = createAction(
  '[Sources] Delete Source Success',
  props<{ id: number }>()
);

export const getSource = createAction(
  '[Sources] Get Source',
  props<{ id: number }>()
);

export const getSourceFail = createAction(
  '[Sources] Get Source Fail',
  props<{ error: string }>()
);

export const getSourceSuccess = createAction(
  '[Sources] Get Source Success',
  props<{ source: Source }>()
);

export const loadSources = createAction('[Sources] Load Sources');

export const loadSourcesFail = createAction(
  '[Sources] Load Sources Fail',
  props<{ error: string }>()
);

export const loadSourcesSuccess = createAction(
  '[Sources] Load Sources Success',
  props<{ sources: Source[] }>()
);

export const saveSource = createAction(
  '[Sources] Save Source',
  props<{ source: Source }>()
);

export const saveSourceFail = createAction(
  '[Sources] Save Source Fail',
  props<{ error: string }>()
);

export const saveSourceSuccess = createAction(
  '[Sources] Save Source Success',
  props<{ source: Source }>()
);
