import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BookmarkDetails } from './bookmark-details';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BookmarkDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});
