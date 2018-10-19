import * as types from './bookmark.type';

export const MOCK_BOOKMARK: types.IBookmark = {
  addedDate: new Date(2018, 11, 16),
  authorName: 'foo',
  id: 1,
  title: 'bar',
  url: 'http://baz.qux',
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
];
