import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_HANDLER } from '../../../testing/handler.mock';
import { MOCK_TAG_LIST } from '../../../testing/tag.mock';

import { TagList } from './tag-list';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <TagList tagList={MOCK_TAG_LIST} onTagRemove={() => MOCK_HANDLER} />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
