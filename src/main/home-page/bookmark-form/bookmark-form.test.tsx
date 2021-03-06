import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_HANDLER } from '../../../testing/handler.mock';

import { BookmarkForm } from './bookmark-form';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BookmarkForm onBookmarkFormSubmit={() => MOCK_HANDLER} />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
