import * as React from 'react';

import { BookmarkForm } from './bookmark-form/bookmark-form';
import { BookmarkTable } from './bookmark-table/bookmark-table';

import { IPreventEvent, ITargetValueEvent, ITableState } from './App.type';

interface IMainProps {
  inputValue: string;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
  onChangeRowsPerPage: (event: ITargetValueEvent) => void;
  onInputChange: (event: ITargetValueEvent) => void;
  onFormSubmit: (event: IPreventEvent) => void;
  onDelete: (bookmarkId: number) => () => void;
  table: ITableState;
}

export const Main = (props: IMainProps) => (
  <div className="main-body">
    <BookmarkForm
      inputValue={props.inputValue}
      onFormSubmit={props.onFormSubmit}
      onInputChange={props.onInputChange}
    />
    <BookmarkTable
      onDelete={props.onDelete}
      onChangePage={props.onChangePage}
      onChangeRowsPerPage={props.onChangeRowsPerPage}
      table={props.table}
    />
  </div>
);
