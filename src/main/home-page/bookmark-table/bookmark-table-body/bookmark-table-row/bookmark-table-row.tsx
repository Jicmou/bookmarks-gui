import * as React from 'react';
import { Link } from 'react-router-dom';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Create from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { IBookmark } from '../../../../../types/bookmark.type';

export interface IBookmarkTableRowProps {
  bookmark: IBookmark;
  onDelete: (bookmarkId: number) => () => void;
}

export const BookmarkTableRow = (props: IBookmarkTableRowProps) => (
  <TableRow>
    <TableCell>{props.bookmark.title}</TableCell>
    <TableCell>
      <a href={props.bookmark.url} target="blank">
        {props.bookmark.url}
      </a>
    </TableCell>
    <TableCell>{props.bookmark.authorName}</TableCell>
    <TableCell>{props.bookmark.creationDate.toLocaleDateString()}</TableCell>
    <TableCell>
      <Link to={`/bookmark/${props.bookmark.id}`}>
        <Create
          className="clickable"
          color="primary"
          id={`edit-bookmark-${props.bookmark.id}`}
        />
      </Link>
    </TableCell>
    <TableCell>
      <DeleteForeverIcon
        className="clickable"
        color="secondary"
        id={`delete-bookmark-${props.bookmark.id}`}
        onClick={props.onDelete(props.bookmark.id)}
      />
    </TableCell>
  </TableRow>
);
