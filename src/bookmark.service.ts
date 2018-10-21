import { TBookmarkList } from './bookmark-table/bookmark.type';
import { MOCK_BOOKMARK_LIST } from './bookmark-table/bookmark.mock';

// timeout simulates API call
export const getBookmarkList = () =>
  new Promise<TBookmarkList>(resolve => {
    setTimeout(() => resolve(MOCK_BOOKMARK_LIST), 1000);
  });
