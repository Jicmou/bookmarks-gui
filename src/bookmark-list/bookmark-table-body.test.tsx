import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_BOOKMARK_LIST } from './bookmark.mock';

import {
  BookmarkTableBody,
  IBookmarkTableBodyProps,
} from './bookmark-table-body';

const renderBookmarkList = (container: HTMLElement) => (
  props: IBookmarkTableBodyProps,
) => {
  ReactDOM.render(
    <BookmarkTableBody bookmarkList={props.bookmarkList} />,
    container,
  );
  ReactDOM.unmountComponentAtNode(container);
};

it('renders without crashing', () => {
  renderBookmarkList(document.createElement('table'))({
    bookmarkList: MOCK_BOOKMARK_LIST,
  });
});
