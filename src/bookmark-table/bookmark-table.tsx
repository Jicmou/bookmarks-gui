import * as React from 'react';
import './bookmark-table.css';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';

import { BookmarkTableHeader } from './bookmark-table-header';
import { BookmarkTableBody } from './bookmark-table-body';

import { ColumnList } from './columnList';
import { TBookmarkList } from './bookmark.type';

export interface IBookmarkTableProps {
  columnList: ColumnList;
  bookmarkList: TBookmarkList;
  onDelete: (bookmarkId: number) => () => void;
}

export interface IBookmarkTableState {
  page: number;
  paginatedList: TBookmarkList;
  rowsPerPage: number;
}

export class BookmarkTable extends React.Component<
  IBookmarkTableProps,
  IBookmarkTableState
> {
  private page = 0;
  private rowsPerPage = 5;

  constructor(props: IBookmarkTableProps) {
    super(props);
    this.state = {
      page: this.page,
      paginatedList: this.getPaginatedList({
        page: this.page,
        rowsPerPage: this.rowsPerPage,
      })(props.bookmarkList),
      rowsPerPage: this.rowsPerPage,
    };
  }

  public render() {
    return (
      <Paper className="bookmark-table-container" elevation={1}>
        <Table className="bookmark-table">
          <BookmarkTableHeader columnList={this.props.columnList} />
          <BookmarkTableBody
            bookmarkList={this.props.bookmarkList}
            onDelete={this.props.onDelete}
          />
        </Table>
        <TablePagination
          component="div"
          count={this.props.bookmarkList.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }

  private getPaginatedList = ({
    rowsPerPage,
    page,
  }: {
    rowsPerPage: number;
    page: number;
  }) => (fullList: TBookmarkList) => {
    const list = fullList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
    return list;
  };
  private handleChangePage(
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) {
    return () => this.setState({ page });
  }

  private handleChangeRowsPerPage = (event: any) => {
    return this.setState({ rowsPerPage: event.target.value });
  };
}
