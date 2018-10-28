import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MOCK_HANDLER } from '../testing/handler.mock';
import { MOCK_TABLE } from '../testing/table.mock';

import { BookmarkTable, IBookmarkTableProps } from './bookmark-table';

const renderBookmarkList = (container: HTMLElement) => (
  props: IBookmarkTableProps,
) => {
  ReactDOM.render(
    <BookmarkTable
      onChangePage={props.onChangePage}
      onChangeRowsPerPage={props.onChangeRowsPerPage}
      onEdit={props.onEdit}
      onDelete={props.onDelete}
      table={props.table}
    />,
    container,
  );
  ReactDOM.unmountComponentAtNode(container);
};

it('renders without crashing', () => {
  renderBookmarkList(document.createElement('div'))({
    onChangePage: MOCK_HANDLER,
    onChangeRowsPerPage: MOCK_HANDLER,
    onDelete: () => MOCK_HANDLER,
    onEdit: () => MOCK_HANDLER,
    table: MOCK_TABLE,
  });
});
