import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import { FETCH_STUB_SUCCESS } from './testing/fetch.stub';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App fetch={FETCH_STUB_SUCCESS} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
