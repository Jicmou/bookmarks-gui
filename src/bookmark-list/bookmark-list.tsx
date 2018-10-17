import * as React from 'react';

import { BookmarkTable } from './bookmark-table';

import { columnList } from './columnList';
import { TBookmarkList } from './bookmark.type';
import { MOCK_BOOKMARK } from './bookmark.mock';

export class BookmarkList extends React.Component {
  private bookmarkList: TBookmarkList = [MOCK_BOOKMARK];

  private columnList = columnList;

  public render() {
    return (
      <BookmarkTable
        columnList={this.columnList}
        bookmarkList={this.bookmarkList}
      />
    );
  }
}
