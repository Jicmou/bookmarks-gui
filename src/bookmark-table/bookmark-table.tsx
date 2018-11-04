import * as React from 'react';
import './bookmark-table.css';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';

import { BookmarkTableHeader } from './bookmark-table-header';
import { BookmarkTableBody } from './bookmark-table-body';

import { ITargetValueEvent, ITableState } from '../App.type';

export interface IBookmarkTableProps {
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
  onChangeRowsPerPage: (event: ITargetValueEvent) => void;
  onDelete: (bookmarkId: number) => () => void;
  onEdit: (bookmarkId: number) => () => void;
  table: ITableState;
}

export const BookmarkTable = (props: IBookmarkTableProps) => (
  <Paper className="bookmark-table-container" elevation={1}>
    <Table className="bookmark-table">
      <BookmarkTableHeader columnList={props.table.columnList} />
      <BookmarkTableBody
        bookmarkList={props.table.paginatedBookmarkList}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
      />
    </Table>
    <TablePagination
      component="div"
      count={props.table.bookmarkListLength}
      rowsPerPage={props.table.rowsPerPage}
      page={props.table.currentPage}
      backIconButtonProps={{
        'aria-label': 'Previous Page',
      }}
      nextIconButtonProps={{
        'aria-label': 'Next Page',
      }}
      onChangePage={props.onChangePage}
      onChangeRowsPerPage={props.onChangeRowsPerPage}
    />
  </Paper>
);
