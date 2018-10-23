import * as types from '../bookmark-table/bookmark.type';

export const MOCK_BOOKMARK: types.IBookmark = {
  authorName: 'foo',
  creationDate: new Date(2018, 11, 16),
  duration: 60,
  height: 600,
  id: 1,
  title: 'bar',
  type: types.EType.VIDEO,
  url: 'http://baz.qux',
  width: 800,
};

export const MOCK_BOOKMARK_LIST: types.TBookmarkList = [
  MOCK_BOOKMARK,
  {
    ...MOCK_BOOKMARK,
    id: 2,
  },
  {
    ...MOCK_BOOKMARK,
    id: 3,
  },
  {
    ...MOCK_BOOKMARK,
    id: 4,
  },
  {
    ...MOCK_BOOKMARK,
    id: 5,
  },
  {
    ...MOCK_BOOKMARK,
    id: 6,
  },
  {
    ...MOCK_BOOKMARK,
    id: 7,
  },
  {
    ...MOCK_BOOKMARK,
    id: 8,
  },
  {
    ...MOCK_BOOKMARK,
    id: 9,
  },
  {
    ...MOCK_BOOKMARK,
    id: 10,
  },
];

export const MOCK_BOOKMARK_JSON: types.IBookmarkJSON = {
  authorName: 'foo',
  creationDate: '2018-10-22T19:42:32+00:00',
  duration: 60,
  height: 600,
  id: 1,
  title: 'bar',
  type: types.EType.VIDEO,
  url: 'http://baz.qux',
  width: 800,
};

export const MOCK_BOOKMARK_JSON_LIST: types.TBookmarkJSONList = [
  MOCK_BOOKMARK_JSON,
  {
    ...MOCK_BOOKMARK_JSON,
    id: 2,
  },
  {
    ...MOCK_BOOKMARK_JSON,
    id: 3,
  },
  {
    ...MOCK_BOOKMARK_JSON,
    id: 4,
  },
  {
    ...MOCK_BOOKMARK_JSON,
    id: 5,
  },
  {
    ...MOCK_BOOKMARK_JSON,
    id: 6,
  },
  {
    ...MOCK_BOOKMARK_JSON,
    id: 7,
  },
  {
    ...MOCK_BOOKMARK_JSON,
    id: 8,
  },
  {
    ...MOCK_BOOKMARK_JSON,
    id: 9,
  },
  {
    ...MOCK_BOOKMARK_JSON,
    id: 10,
  },
];

export const MOCK_GET_BOOKMARK_LIST_RESPONSE_BODY: types.IGetBookmarkListResponse = {
  bookmarkList: MOCK_BOOKMARK_JSON_LIST,
};
