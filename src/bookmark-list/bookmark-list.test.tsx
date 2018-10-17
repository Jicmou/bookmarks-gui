import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BookmarkList } from './bookmark-list';

const renderBookmarkList = (container: HTMLElement) => {
  ReactDOM.render(<BookmarkList />, container);
  ReactDOM.unmountComponentAtNode(container);
};

it('renders without crashing', () => {
  renderBookmarkList(document.createElement('div'));
});
