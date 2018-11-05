import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { RoutedBookmarkPage, IBookmarkPageProps } from './bookmark-page';
import { MOCK_BOOKMARK_WITH_TAG_LIST } from '../../testing/bookmark.mock';
import { MOCK_HANDLER } from '../../testing/handler.mock';

const mockProps: IBookmarkPageProps = {
  addTagToBookmarkTagList: () => () => MOCK_BOOKMARK_WITH_TAG_LIST,
  onBookmarkSave: MOCK_HANDLER,
  removeTagFromBookmarkById: () => () => MOCK_BOOKMARK_WITH_TAG_LIST,
  retrieveCurrentBookmark: () => Promise.resolve(MOCK_BOOKMARK_WITH_TAG_LIST),
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <RoutedBookmarkPage
        addTagToBookmarkTagList={mockProps.addTagToBookmarkTagList}
        onBookmarkSave={mockProps.onBookmarkSave}
        removeTagFromBookmarkById={mockProps.removeTagFromBookmarkById}
        retrieveCurrentBookmark={mockProps.retrieveCurrentBookmark}
      />
    </Router>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
