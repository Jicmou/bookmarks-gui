import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_BOOKMARK_LIST } from '../testing/bookmark.mock';
import { MOCK_HANDLER } from '../testing/handler.mock';

import {
  BookmarkTableBody,
  IBookmarkTableBodyProps,
} from './bookmark-table-body';

const renderBookmarkList = (container: HTMLElement) => (
  props: IBookmarkTableBodyProps,
) => {
  ReactDOM.render(
    <BookmarkTableBody
      bookmarkList={props.bookmarkList}
      onDelete={() => MOCK_HANDLER}
      onEdit={() => MOCK_HANDLER}
    />,
    container,
  );
  ReactDOM.unmountComponentAtNode(container);
};

it('renders without crashing', () => {
  renderBookmarkList(document.createElement('table'))({
    bookmarkList: MOCK_BOOKMARK_LIST,
    onDelete: () => MOCK_HANDLER,
    onEdit: () => MOCK_HANDLER,
  });
});
