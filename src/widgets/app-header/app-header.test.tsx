import * as React from 'react';
import * as ReactDOM from 'react-dom';

import logo from '../../logo.svg';

import { AppHeader } from './app-header';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppHeader logo={logo} title="bar" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
