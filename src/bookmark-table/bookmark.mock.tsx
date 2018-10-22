import * as types from './bookmark.type';

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
];
