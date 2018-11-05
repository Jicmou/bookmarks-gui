import * as React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

import { ColumnList } from '../columnList';

export interface IBookmarkTableHeaderProps {
  columnList: ColumnList;
}

export const BookmarkTableHeader = (props: IBookmarkTableHeaderProps) => (
  <TableHead>
    <TableRow>
      {props.columnList.map(column => (
        <TableCell key={column}>{column}</TableCell>
      ))}
    </TableRow>
  </TableHead>
);
