import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ColumnList, EColumns } from './columnList';

import {
  BookmarkTableHeader,
  IBookmarkTableHeaderProps,
} from './bookmark-table-header';

const renderBookmarkList = (container: HTMLElement) => (
  props: IBookmarkTableHeaderProps,
) => {
  ReactDOM.render(
    <BookmarkTableHeader columnList={props.columnList} />,
    container,
  );
  ReactDOM.unmountComponentAtNode(container);
};

it('renders without crashing', () => {
  const MOCK_COLUMN_LIST: ColumnList = [EColumns.TITLE, EColumns.URL];
  renderBookmarkList(document.createElement('table'))({
    columnList: MOCK_COLUMN_LIST,
  });
});
