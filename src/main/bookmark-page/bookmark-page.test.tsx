import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { BookmarkPage, IBookmarkPageProps } from './bookmark-page';
import { MOCK_BOOKMARK_WITH_TAG_LIST } from '../../testing/bookmark.mock';
import { MOCK_HANDLER } from '../../testing/handler.mock';

const mockProps: IBookmarkPageProps = {
  bookmark: MOCK_BOOKMARK_WITH_TAG_LIST,
  onBookmarkSave: MOCK_HANDLER,
  onTagFormSubmit: () => MOCK_HANDLER,
  onTagRemove: () => MOCK_HANDLER,
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <BookmarkPage
        bookmark={mockProps.bookmark}
        onBookmarkSave={mockProps.onBookmarkSave}
        onTagFormSubmit={mockProps.onTagFormSubmit}
        onTagRemove={mockProps.onTagRemove}
      />
    </Router>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
