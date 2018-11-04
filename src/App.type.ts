import { ColumnList } from './home-page/bookmark-table/columnList';
import { Fetch } from './types/fetch.type';
import { IBookmarkService } from './services/bookmark.service.type';
import { TBookmarkList, IBookmarkWithTagList } from './types/bookmark.type';

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
