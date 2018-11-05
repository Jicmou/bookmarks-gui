import { ColumnList } from './main/home-page/bookmark-table/columnList';
import { Fetch } from './types/fetch.type';
import { IBookmarkService } from './services/bookmark.service.type';
import { TBookmarkList } from './types/bookmark.type';

export interface IAppProps {
  fetch: Fetch;
  bookmarkService: IBookmarkService;
}

export interface IModalState {
  message: string;
  open: boolean;
}

export enum ERowsPerPAge {
  FIVE = 5,
  TEN = 10,
  TWENTY_FIVE = 25,
}

export interface ITableState {
  bookmarkListLength: number;
  columnList: ColumnList;
  currentPage: number;
  paginatedBookmarkList: TBookmarkList;
  rowsPerPage: ERowsPerPAge;
}

export interface IAppState {
  apiUrl: string;
  bookmarkList: TBookmarkList;
  modal: IModalState;
  table: ITableState;
  title: string;
}

export interface ITargetValueEvent {
  target: { value: string };
}

export interface IPreventEvent {
  preventDefault: () => void;
}
