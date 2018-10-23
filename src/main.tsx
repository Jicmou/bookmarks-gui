import * as React from 'react';

import { BookmarkTable } from './bookmark-table/bookmark-table';

import { ColumnList } from './bookmark-table/columnList';
import { TBookmarkList } from './bookmark-table/bookmark.type';

interface IMainProps {
  bookmarkList: TBookmarkList;
  columnList: ColumnList;
}

export class Main extends React.Component<IMainProps> {
  public render() {
    return (
      <BookmarkTable
        columnList={this.props.columnList}
        bookmarkList={this.props.bookmarkList}
      />
    );
  }
}
