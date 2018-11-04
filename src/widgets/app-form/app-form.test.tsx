import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_HANDLER } from '../../testing/handler.mock';

import { AppForm } from './app-form';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppForm
      buttonName="foo"
      formId="baz"
      inputLabel="bar"
      onAppFormSubmit={() => MOCK_HANDLER}
    />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
