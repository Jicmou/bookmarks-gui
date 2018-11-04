import * as React from 'react';

import TableBody from '@material-ui/core/TableBody';

import { BookmarkTableRow } from './bookmark-table-row/bookmark-table-row';
import { TBookmarkList } from '../../../types/bookmark.type';

export interface IBookmarkTableBodyProps {
  bookmarkList: TBookmarkList;
  onDelete: (bookmarkId: number) => () => void;
  onEdit: (bookmarkId: number) => () => void;
}

export const BookmarkTableBody = (props: IBookmarkTableBodyProps) => (
  <TableBody>
    {props.bookmarkList.map(bookmark => (
      <BookmarkTableRow
        bookmark={bookmark}
        key={bookmark.id}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
      />
    ))}
  </TableBody>
);
