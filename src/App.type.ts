import { ColumnList } from './bookmark-table/columnList';
import { Fetch } from './types/fetch.type';
import { IBookmarkService } from './services/bookmark.service.type';
import {
  TBookmarkList,
  IBookmarkWithTagList,
} from './bookmark-table/bookmark.type';

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
  columnList: ColumnList;
  currentPage: number;
  paginatedBookmarkList: TBookmarkList;
  rowsPerPage: ERowsPerPAge;
  bookmarkListLength: number;
}

export interface IAppState {
  apiUrl: string;
  bookmarkList: TBookmarkList;
  currentBookmark: IBookmarkWithTagList | undefined;
  inputValue: string;
  modal: IModalState;
  table: ITableState;
}

export interface ITargetValueEvent {
  target: { value: string };
}

export interface IPreventEvent {
  preventDefault: () => void;
}
