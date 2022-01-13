import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Path } from '../shared/paths';

@Injectable({ providedIn: 'root' })
export class PathService extends EntityCollectionServiceBase<Path> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Paths', serviceElementsFactory);
  }
}
