import * as React from 'react';

import { BookmarkTable } from './bookmark-table/bookmark-table';

import { columnList, ColumnList } from './bookmark-table/columnList';
import { TBookmarkList } from './bookmark-table/bookmark.type';
import { getBookmarkList } from './bookmark.service';

interface IMainState {
  bookmarkList: TBookmarkList;
  columnList: ColumnList;
}

export class Main extends React.Component<{}, IMainState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      bookmarkList: [],
      columnList,
    };
  }

  public componentDidMount() {
    return getBookmarkList().then(bookmarkList => {
      this.setState({
        bookmarkList,
        columnList,
      });
    });
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
