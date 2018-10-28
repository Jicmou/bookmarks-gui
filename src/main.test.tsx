import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_HANDLER } from './testing/handler.mock';
import { MOCK_TABLE } from './testing/table.mock';

import { Main } from './main';

const mockCurriedHandler = () => MOCK_HANDLER;

const renderMain = (container: HTMLElement) => {
  ReactDOM.render(
    <Main
      inputValue=""
      onChangePage={MOCK_HANDLER}
      onChangeRowsPerPage={MOCK_HANDLER}
      onDelete={mockCurriedHandler}
      onEdit={mockCurriedHandler}
      onFormSubmit={MOCK_HANDLER}
      onInputChange={MOCK_HANDLER}
      table={MOCK_TABLE}
    />,
    container,
  );
  ReactDOM.unmountComponentAtNode(container);
};

it('renders without crashing', () => {
  renderMain(document.createElement('div'));
});
