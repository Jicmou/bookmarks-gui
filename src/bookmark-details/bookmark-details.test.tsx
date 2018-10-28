import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BookmarkDetails, IBookmarkDetailsProps } from './bookmark-details';

const mockProps: IBookmarkDetailsProps = {
  match: {
    params: {
      bookmarkId: '1',
    },
  },
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BookmarkDetails match={mockProps.match} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
