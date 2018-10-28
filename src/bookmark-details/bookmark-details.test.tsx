import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BookmarkDetails, IBookmarkDetailsProps } from './bookmark-details';
import { MOCK_BOOKMARK_WITH_TAG_LIST } from '../testing/bookmark.mock';

const mockProps: IBookmarkDetailsProps = {
  bookmark: MOCK_BOOKMARK_WITH_TAG_LIST,
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BookmarkDetails bookmark={mockProps.bookmark} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
