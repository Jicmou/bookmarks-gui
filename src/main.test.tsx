import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_BOOKMARK_LIST } from './testing/bookmark.mock';
import { MOCK_COLUMN_LIST } from './testing/column.mock';
import { MOCK_HANDLER } from './testing/handler.mock';

import { Main } from './main';

const renderBookmarkList = (container: HTMLElement) => {
  ReactDOM.render(
    <Main
      bookmarkList={MOCK_BOOKMARK_LIST}
      columnList={MOCK_COLUMN_LIST}
      inputValue=""
      onInputChange={MOCK_HANDLER}
      onFormSubmit={MOCK_HANDLER}
    />,
    container,
  );
  ReactDOM.unmountComponentAtNode(container);
};

it('renders without crashing', () => {
  renderBookmarkList(document.createElement('div'));
});
