import { columnList } from './bookmark-table/columnList';
import * as types from './App.type';

const API_URL = 'http://localhost:8000';

const MODAL_INIT_VALUE: types.IModalState = {
  message: '',
  open: false,
};

const TABLE_INIT_VALUE: types.ITableState = {
  bookmarkListLength: 0,
  columnList,
  currentPage: 0,
  paginatedBookmarkList: [],
  rowsPerPage: types.ERowsPerPAge.FIVE,
};

export const INITIAL_STATE: types.IAppState = {
  apiUrl: API_URL,
  bookmarkList: [],
  currentBookmark: undefined,
  inputValue: '',
  modal: MODAL_INIT_VALUE,
  table: TABLE_INIT_VALUE,
};
