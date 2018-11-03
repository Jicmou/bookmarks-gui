import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_TAG_LIST } from '../testing/tag.mock';

import { TagList } from './tag-list';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TagList tagList={MOCK_TAG_LIST} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
