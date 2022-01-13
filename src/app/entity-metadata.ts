import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Paths: {
    sortComparer: sortByName,
  },
  Sources: {
    sortComparer: sortByName,
  },
  Courses: {},
};

export function sortByName(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name);
}

const pluralNames = { Paths: 'Paths', Sources: 'Sources', Courses: 'Courses' };

export const entityConfig = {
  entityMetadata,
  pluralNames,
};
