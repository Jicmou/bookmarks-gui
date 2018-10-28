import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BookmarkDetails, IBookmarkDetailsProps } from './bookmark-details';
import { MOCK_BOOKMARK_WITH_TAG_LIST } from '../testing/bookmark.mock';
import { MOCK_HANDLER } from '../testing/handler.mock';

const mockProps: IBookmarkDetailsProps = {
  bookmark: MOCK_BOOKMARK_WITH_TAG_LIST,
  tagForm: {
    inputValue: '',
    onFormSubmit: MOCK_HANDLER,
    onInputChange: MOCK_HANDLER,
  },
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BookmarkDetails
      bookmark={mockProps.bookmark}
      tagForm={mockProps.tagForm}
    />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
