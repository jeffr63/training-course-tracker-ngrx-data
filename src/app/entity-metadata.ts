import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Paths: {},
  Sources: {},
};

const pluralNames = { Paths: 'Paths', Sources: 'Sources' };

export const entityConfig = {
  entityMetadata,
  pluralNames,
};
