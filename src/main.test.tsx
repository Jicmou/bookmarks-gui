import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Main } from './main';
import { MOCK_BOOKMARK_LIST } from './testing/bookmark.mock';
import { MOCK_COLUMN_LIST } from './testing/column.mock';

const renderBookmarkList = (container: HTMLElement) => {
  ReactDOM.render(
    <Main bookmarkList={MOCK_BOOKMARK_LIST} columnList={MOCK_COLUMN_LIST} />,
    container,
  );
  ReactDOM.unmountComponentAtNode(container);
};

it('renders without crashing', () => {
  renderBookmarkList(document.createElement('div'));
});
