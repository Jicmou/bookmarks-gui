import { EColumns } from '../bookmark-table/columnList';
import { MOCK_BOOKMARK_LIST } from './bookmark.mock';
import { ITableState, ERowsPerPAge } from '../App.type';

export const MOCK_TABLE: ITableState = {
  bookmarkListLength: MOCK_BOOKMARK_LIST.length,
  columnList: [EColumns.TITLE, EColumns.URL],
  currentPage: 1,
  paginatedBookmarkList: MOCK_BOOKMARK_LIST.slice(
    ERowsPerPAge.TEN,
    ERowsPerPAge.TEN * 2,
  ),
  rowsPerPage: ERowsPerPAge.TEN,
};
