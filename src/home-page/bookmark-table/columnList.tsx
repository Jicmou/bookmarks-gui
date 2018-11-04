export enum EColumns {
  CREATION_DATE = 'creation',
  AUTHOR_NAME = 'author',
  TITLE = 'title',
  URL = 'url',
  DELETE = '',
}

export type ColumnList = EColumns[];

export const columnList: ColumnList = [
  EColumns.TITLE,
  EColumns.URL,
  EColumns.AUTHOR_NAME,
  EColumns.CREATION_DATE,
  EColumns.DELETE,
];
