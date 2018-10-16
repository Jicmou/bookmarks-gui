import * as React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import { ColumnList } from './columnList';

interface IBookmarkTableHeaderProps {
  columnList: ColumnList;
}

const BookmarkTableHeader = (props: IBookmarkTableHeaderProps) => (
  <TableHead>
    {props.columnList.map(column => (
      <TableCell>{column}</TableCell>
    ))}
  </TableHead>
);

export default BookmarkTableHeader;
