import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ColumnList, EColumns } from './columnList';
import { MOCK_BOOKMARK_LIST } from '../testing/bookmark.mock';
import { MOCK_HANDLER } from '../testing/handler.mock';

import { BookmarkTable, IBookmarkTableProps } from './bookmark-table';

const renderBookmarkList = (container: HTMLElement) => (
  props: IBookmarkTableProps,
) => {
  ReactDOM.render(
    <BookmarkTable
      bookmarkList={props.bookmarkList}
      columnList={props.columnList}
      onDelete={() => MOCK_HANDLER}
    />,
    container,
  );
  ReactDOM.unmountComponentAtNode(container);
};

it('renders without crashing', () => {
  const MOCK_COLUMN_LIST: ColumnList = [EColumns.TITLE, EColumns.URL];
  renderBookmarkList(document.createElement('div'))({
    bookmarkList: MOCK_BOOKMARK_LIST,
    columnList: MOCK_COLUMN_LIST,
    onDelete: () => MOCK_HANDLER,
  });
});
