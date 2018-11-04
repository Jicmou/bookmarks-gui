import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { BookmarkPage, IBookmarkDetailsProps } from './bookmark-page';
import { MOCK_BOOKMARK_WITH_TAG_LIST } from '../testing/bookmark.mock';
import { MOCK_HANDLER } from '../testing/handler.mock';

const mockProps: IBookmarkDetailsProps = {
  bookmark: MOCK_BOOKMARK_WITH_TAG_LIST,
  onBookmarkSave: MOCK_HANDLER,
  onFormSubmit: () => MOCK_HANDLER,
  onTagRemove: () => MOCK_HANDLER,
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <BookmarkPage
        bookmark={mockProps.bookmark}
        onBookmarkSave={mockProps.onBookmarkSave}
        onFormSubmit={mockProps.onFormSubmit}
        onTagRemove={mockProps.onTagRemove}
      />
    </Router>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
