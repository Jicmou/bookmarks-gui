import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_HANDLER } from '../../../../testing/handler.mock';
import { MOCK_TAG } from '../../../../testing/tag.mock';

import { TagItem } from './tag-item';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <TagItem onTagRemove={() => MOCK_HANDLER} tag={MOCK_TAG} />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
