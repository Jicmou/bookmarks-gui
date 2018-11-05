import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_HANDLER } from '../../../testing/handler.mock';

import { TagForm } from './tag-form';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TagForm onTagFormSubmit={() => MOCK_HANDLER} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
