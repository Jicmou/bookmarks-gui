import { ColumnList } from './bookmark-table/columnList';
import { Fetch } from './types/fetch.type';
import { IBookmarkService } from './bookmark.service.type';
import { TBookmarkList } from './bookmark-table/bookmark.type';

export interface IAppProps {
  fetch: Fetch;
  bookmarkService: IBookmarkService;
}

interface IModalState {
  message: string;
  open: boolean;
}

export enum ERowsPerPAge {
  FIVE = 5,
  TEN = 10,
  TWENTY_FIVE = 25,
}

interface ITableState {
  columnList: ColumnList;
  currentPage: number;
  paginatedBookmarkList: TBookmarkList;
  rowsPerPage: ERowsPerPAge;
}

export interface IAppState {
  apiUrl: string;
  bookmarkList: TBookmarkList;
  inputValue: string;
  modal: IModalState;
  table: ITableState;
}

export interface IInputEvent {
  target: { value: string };
}

export interface IPreventEvent {
  preventDefault: () => void;
}
