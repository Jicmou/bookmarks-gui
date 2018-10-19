import * as React from 'react';

import { BookmarkTable } from './bookmark-list/bookmark-table';

import { columnList, ColumnList } from './bookmark-list/columnList';
import { TBookmarkList } from './bookmark-list/bookmark.type';
import { MOCK_BOOKMARK_LIST } from './bookmark-list/bookmark.mock';

interface IMainState {
  bookmarkList: TBookmarkList;
  columnList: ColumnList;
}

export class Main extends React.Component<{}, IMainState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      bookmarkList: MOCK_BOOKMARK_LIST,
      columnList,
    };
  }

  public render() {
    return (
      <BookmarkTable
        columnList={this.state.columnList}
        bookmarkList={this.state.bookmarkList}
      />
    );
  }
}
