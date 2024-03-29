import { Injectable } from '@angular/core';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { Course } from '@models/course';

@Injectable({ providedIn: 'root' })
export class CourseService extends EntityCollectionServiceBase<Course> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Courses', serviceElementsFactory);
  }
}
