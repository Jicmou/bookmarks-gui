import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BookmarkForm } from './bookmark-form';

it('renders without crashing', () => {
  // tslint:disable-next-line:no-empty
  // const MOCK_ON_CHANGE: TOnChange = () => {};
  const div = document.createElement('div');
  ReactDOM.render(<BookmarkForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
