export enum EColumns {
  AUTHOR_NAME = 'author',
  CREATION_DATE = 'creation',
  DELETE = 'delete',
  EDIT = 'edit',
  TITLE = 'title',
  URL = 'url',
}

export type ColumnList = EColumns[];

export const columnList: ColumnList = [
  EColumns.TITLE,
  EColumns.URL,
  EColumns.AUTHOR_NAME,
  EColumns.CREATION_DATE,
  EColumns.EDIT,
  EColumns.DELETE,
];
