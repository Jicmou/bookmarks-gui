import * as React from 'react';

import { BookmarkForm } from './bookmark-form/bookmark-form';
import { BookmarkTable } from './bookmark-table/bookmark-table';

import { ColumnList } from './bookmark-table/columnList';
import { TBookmarkList } from './bookmark-table/bookmark.type';

import { IPreventEvent, IInputEvent } from './App';

interface IMainProps {
  bookmarkList: TBookmarkList;
  columnList: ColumnList;
  inputValue: string;
  onInputChange: (event: IInputEvent) => void;
  onFormSubmit: (event: IPreventEvent) => void;
}

export class Main extends React.Component<IMainProps> {
  public render() {
    return (
      <div className="main-body">
        <BookmarkForm
          inputValue={this.props.inputValue}
          onFormSubmit={this.props.onFormSubmit}
          onInputChange={this.props.onInputChange}
        />
        <BookmarkTable
          columnList={this.props.columnList}
          bookmarkList={this.props.bookmarkList}
        />
      </div>
    );
  }
}
