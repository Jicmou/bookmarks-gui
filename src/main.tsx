import * as React from 'react';

import { BookmarkForm } from './bookmark-form/bookmark-form';
import { BookmarkTable } from './bookmark-table/bookmark-table';

import { ColumnList } from './bookmark-table/columnList';
import { TBookmarkList } from './bookmark-table/bookmark.type';

import { IPreventEvent, IInputEvent } from './App.type';

interface IMainProps {
  bookmarkList: TBookmarkList;
  columnList: ColumnList;
  inputValue: string;
  onInputChange: (event: IInputEvent) => void;
  onFormSubmit: (event: IPreventEvent) => void;
  onDelete: (bookmarkId: number) => () => void;
}

export const Main = (props: IMainProps) => (
  <div className="main-body">
    <BookmarkForm
      inputValue={props.inputValue}
      onFormSubmit={props.onFormSubmit}
      onInputChange={props.onInputChange}
    />
    <BookmarkTable
      columnList={props.columnList}
      bookmarkList={props.bookmarkList}
      onDelete={props.onDelete}
    />
  </div>
);
