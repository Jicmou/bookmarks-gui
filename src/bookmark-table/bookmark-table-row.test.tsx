import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_BOOKMARK } from '../testing/bookmark.mock';
import { MOCK_HANDLER } from '../testing/handler.mock';

import { BookmarkTableRow, IBookmarkTableRowProps } from './bookmark-table-row';

const renderBookmarkTableRow = (container: HTMLElement) => (
  props: IBookmarkTableRowProps,
) => {
  ReactDOM.render(
    <BookmarkTableRow
      bookmark={props.bookmark}
      key={props.bookmark.id}
      onDelete={() => MOCK_HANDLER}
      onEdit={() => MOCK_HANDLER}
    />,
    container,
  );
  ReactDOM.unmountComponentAtNode(container);
};

it('renders without crashing', () => {
  renderBookmarkTableRow(document.createElement('tbody'))({
    bookmark: MOCK_BOOKMARK,
    onDelete: () => MOCK_HANDLER,
    onEdit: () => MOCK_HANDLER,
  });
});
