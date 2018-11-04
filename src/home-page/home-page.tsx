import * as React from 'react';

import {
  BookmarkForm,
  IBookmarkFormProps,
} from '../bookmark-form/bookmark-form';
import {
  BookmarkTable,
  IBookmarkTableProps,
} from '../bookmark-table/bookmark-table';

export type HomePageProps = IBookmarkFormProps & IBookmarkTableProps;

export const HomePage = (props: HomePageProps) => (
  <div className="home-page-body">
    <BookmarkForm onBookmarkFormSubmit={props.onBookmarkFormSubmit} />
    <BookmarkTable
      onDelete={props.onDelete}
      onEdit={props.onEdit}
      onChangePage={props.onChangePage}
      onChangeRowsPerPage={props.onChangeRowsPerPage}
      table={props.table}
    />
  </div>
);
