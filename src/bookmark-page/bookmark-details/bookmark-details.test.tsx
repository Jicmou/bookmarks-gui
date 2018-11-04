import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_BOOKMARK_WITH_TAG_LIST } from '../../testing/bookmark.mock';
import { MOCK_HANDLER } from '../../testing/handler.mock';

import { BookmarkDetails, IBookmarkDetailsProps } from './bookmark-details';

const mockProps: IBookmarkDetailsProps = {
  bookmark: MOCK_BOOKMARK_WITH_TAG_LIST,
  onTagRemove: () => MOCK_HANDLER,
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BookmarkDetails
      bookmark={mockProps.bookmark}
      onTagRemove={mockProps.onTagRemove}
    />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
