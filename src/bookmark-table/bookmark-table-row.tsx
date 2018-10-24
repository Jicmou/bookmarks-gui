import * as React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { IBookmark } from './bookmark.type';

export interface IBookmarkTableRowProps {
  bookmark: IBookmark;
  onDelete: (bookmarkId: number) => () => void;
}

export const BookmarkTableRow = (props: IBookmarkTableRowProps) => (
  <TableRow>
    <TableCell>{props.bookmark.title}</TableCell>
    <TableCell>{props.bookmark.url}</TableCell>
    <TableCell>{props.bookmark.authorName}</TableCell>
    <TableCell>{props.bookmark.creationDate.toString()}</TableCell>
    <TableCell>
      <DeleteForeverIcon
        id={props.bookmark.url}
        onClick={props.onDelete(props.bookmark.id)}
      />
    </TableCell>
  </TableRow>
);
