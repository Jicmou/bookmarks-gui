import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { BookmarkPage, IBookmarkDetailsProps } from './bookmark-page';
import { MOCK_BOOKMARK_WITH_TAG_LIST } from '../testing/bookmark.mock';
import { MOCK_HANDLER } from '../testing/handler.mock';

const mockProps: IBookmarkDetailsProps = {
  bookmark: MOCK_BOOKMARK_WITH_TAG_LIST,
  onTagRemove: () => MOCK_HANDLER,
  tagForm: {
    inputValue: '',
    onFormSubmit: MOCK_HANDLER,
    onInputChange: MOCK_HANDLER,
  },
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <BookmarkPage
        bookmark={mockProps.bookmark}
        tagForm={mockProps.tagForm}
        onTagRemove={mockProps.onTagRemove}
      />
    </Router>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
