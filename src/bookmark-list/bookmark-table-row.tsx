import * as React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { IBookmark } from './bookmark.type';

interface IBookmarkTableRowProps {
  bookmark: IBookmark;
}

const BookmarkTableRow = (props: IBookmarkTableRowProps) => (
  <TableRow>
    <TableCell>{props.bookmark.title}</TableCell>
    <TableCell>{props.bookmark.url}</TableCell>
    <TableCell>{props.bookmark.authorName}</TableCell>
    <TableCell>{props.bookmark.addedDate.toString()}</TableCell>
  </TableRow>
);

export default BookmarkTableRow;
