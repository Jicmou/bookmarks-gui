import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_BOOKMARK } from './bookmark.mock';

import { BookmarkTableRow, IBookmarkTableRowProps } from './bookmark-table-row';

const renderBookmarkTableRow = (container: HTMLElement) => (
  props: IBookmarkTableRowProps,
) => {
  ReactDOM.render(
    <BookmarkTableRow bookmark={props.bookmark} key={props.bookmark.id} />,
    container,
  );
  ReactDOM.unmountComponentAtNode(container);
};

it('renders without crashing', () => {
  renderBookmarkTableRow(document.createElement('tbody'))({
    bookmark: MOCK_BOOKMARK,
  });
});
