import { createAction, props } from '@ngrx/store';

import { Path } from '../../shared/paths';

export const deletePath = createAction(
  '[Paths] Delete Path',
  props<{ id: number }>()
);

export const deletePathFail = createAction(
  '[Paths] Delete Path Fail',
  props<{ error: string }>()
);

export const deletePathSuccess = createAction(
  '[Paths] Delete Path Success',
  props<{ id: number }>()
);

export const getPath = createAction(
  '[Paths] Get Path',
  props<{ id: number }>()
);

export const getPathFail = createAction(
  '[Paths] Get Path Fail',
  props<{ error: string }>()
);

export const getPathSuccess = createAction(
  '[Paths] Get Path Success',
  props<{ path: Path }>()
);

export const loadPaths = createAction('[Paths] Load Paths');

export const loadPathsFail = createAction(
  '[Paths] Load Paths Fail',
  props<{ error: string }>()
);

export const loadPathsSuccess = createAction(
  '[Paths] Load Paths Success',
  props<{ paths: Path[] }>()
);

export const savePath = createAction(
  '[Paths] Save Path',
  props<{ path: Path }>()
);

export const savePathFail = createAction(
  '[Paths] Save Path Fail',
  props<{ error: string }>()
);

export const savePathSuccess = createAction(
  '[Paths] Save Path Success',
  props<{ path: Path }>()
);
