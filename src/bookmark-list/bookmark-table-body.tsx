import * as React from 'react';

import TableBody from '@material-ui/core/TableBody';

import BookmarkTableRow from './bookmark-table-row';
import { TBookmarkList } from './bookmark.type';

interface IBookmarkTableBodyProps {
  bookmarkList: TBookmarkList;
}

const BookmarkTableBody = (props: IBookmarkTableBodyProps) => (
  <TableBody>
    {props.bookmarkList.map(bookmark => (
      <BookmarkTableRow bookmark={bookmark} />
    ))}
  </TableBody>
);

export default BookmarkTableBody;
