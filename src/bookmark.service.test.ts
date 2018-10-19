import { MOCK_BOOKMARK_LIST } from './bookmark-table/bookmark.mock';

import * as testedModule from './bookmark.service';

describe('Bookmark service: ', () => {
  describe('getBookmarkList() ', () => {
    it('SHOULD eventually get a mocked bookmark list: ', () =>
      testedModule
        .getBookmarkList()
        .then(expectedBookmarkList =>
          expect(expectedBookmarkList).toEqual(MOCK_BOOKMARK_LIST),
        ));
  });
});
