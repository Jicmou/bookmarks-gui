import * as React from 'react';

import {
  BookmarkForm,
  IBookmarkFormProps,
} from './bookmark-form/bookmark-form';
import {
  BookmarkTable,
  IBookmarkTableProps,
} from './bookmark-table/bookmark-table';

export type HomePageProps = IBookmarkFormProps & IBookmarkTableProps;

export const HomePage = (props: HomePageProps) => (
  <div className="home-page-body">
    <BookmarkForm onBookmarkFormSubmit={props.onBookmarkFormSubmit} />
    {props.table.bookmarkListLength ? (
      <BookmarkTable
        onDelete={props.onDelete}
        onChangePage={props.onChangePage}
        onChangeRowsPerPage={props.onChangeRowsPerPage}
        table={props.table}
      />
    ) : (
      <div className="no-bookmark-container">No bookmark so far...</div>
    )}
  </div>
);
