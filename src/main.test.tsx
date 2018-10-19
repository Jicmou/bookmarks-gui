import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Main } from './main';

const renderBookmarkList = (container: HTMLElement) => {
  ReactDOM.render(<Main />, container);
  ReactDOM.unmountComponentAtNode(container);
};

it('renders without crashing', () => {
  renderBookmarkList(document.createElement('div'));
});
