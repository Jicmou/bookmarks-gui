import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_COLUMN_LIST } from '../../testing/column.mock';

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
  renderBookmarkList(document.createElement('table'))({
    columnList: MOCK_COLUMN_LIST,
  });
});
