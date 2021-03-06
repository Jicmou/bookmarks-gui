import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_HANDLER } from '../../testing/handler.mock';
import { MOCK_TABLE } from '../../testing/table.mock';

import { HomePage } from './home-page';

const mockCurriedHandler = () => MOCK_HANDLER;

const renderMain = (container: HTMLElement) => {
  ReactDOM.render(
    <HomePage
      onBookmarkFormSubmit={() => MOCK_HANDLER}
      onChangePage={MOCK_HANDLER}
      onChangeRowsPerPage={MOCK_HANDLER}
      onDelete={mockCurriedHandler}
      table={MOCK_TABLE}
    />,
    container,
  );
  ReactDOM.unmountComponentAtNode(container);
};

it('renders without crashing', () => {
  renderMain(document.createElement('div'));
});
