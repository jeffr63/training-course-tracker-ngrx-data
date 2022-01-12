import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, concatMap } from 'rxjs/operators';

import * as pathActions from './paths.actions';
import { Path } from '../../shared/paths';
import { PathsService } from '../../services/paths.service';

@Injectable()
export class PathsEffects {

  deletePath$ = createEffect(() => this.actions$.pipe(
    ofType(pathActions.deletePath),
    switchMap(({ id }) => this.pathsService.delete(id).pipe(
      map(() => (pathActions.deletePathSuccess({ id }))),
      catchError(err => of(pathActions.deletePathFail({ error: err })))
    ))
  ));

  getPath$ = createEffect(() => this.actions$.pipe(
    ofType(pathActions.getPath),
    concatMap(({ id }) => this.pathsService.get(id).pipe(
      map((path: Path) => (pathActions.getPathSuccess({ path: path }))),
      catchError(err => of(pathActions.getPathFail({ error: err })))
    ))
  ));

  loadPaths$ = createEffect(() => this.actions$.pipe(
    ofType(pathActions.loadPaths),
    switchMap(() => this.pathsService.load().pipe(
      map((paths: any[]) => (pathActions.loadPathsSuccess({ paths: paths }))),
      catchError(err => of(pathActions.loadPathsFail({ error: err })))
    ))
  ));

  savePath$ = createEffect(() => this.actions$.pipe(
    ofType(pathActions.savePath),
    concatMap(({ path }) => this.pathsService.save(path).pipe(
      concatMap((path: Path) => [
        pathActions.loadPaths(),
        pathActions.savePathSuccess({ 'path': path })
      ]),
      catchError(err => of(pathActions.savePathFail({ error: err }))))
    ))
  );

  constructor(
    private actions$: Actions,
    private pathsService: PathsService
  ) { }
}
