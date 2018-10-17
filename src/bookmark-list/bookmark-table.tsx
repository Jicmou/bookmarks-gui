import * as React from 'react';

import Table from '@material-ui/core/Table';

import { BookmarkTableHeader } from './bookmark-table-header';
import { BookmarkTableBody } from './bookmark-table-body';

import { ColumnList } from './columnList';
import { TBookmarkList } from './bookmark.type';

export interface IBookmarkTableProps {
  columnList: ColumnList;
  bookmarkList: TBookmarkList;
}

export const BookmarkTable = (props: IBookmarkTableProps) => (
  <Table>
    <BookmarkTableHeader columnList={props.columnList} />
    <BookmarkTableBody bookmarkList={props.bookmarkList} />
  </Table>
);
