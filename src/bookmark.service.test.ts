import { MOCK_BOOKMARK_JSON } from './testing/bookmark.mock';
import { injectJsonSuccessResponseToFetch } from './testing/fetch.stub';

import * as testedModule from './bookmark.service';

describe('Bookmark service: ', () => {
  describe('fromJSONToBookmark', () => {
    describe('GIVEN a JSON Bookmark, ', () => {
      it('SHOULD return a bookmark', () => {
        expect(testedModule.fromJSONToBookmark(MOCK_BOOKMARK_JSON)).toEqual({
          ...MOCK_BOOKMARK_JSON,
          creationDate: new Date(MOCK_BOOKMARK_JSON.creationDate),
        });
      });
    });
  });

  describe('getBookmarkList() ', () => {
    describe('GIVEN a GET Bookmark List Response from the REST API', () => {
      const mockFetch = injectJsonSuccessResponseToFetch({
        bookmarkList: [MOCK_BOOKMARK_JSON],
      });
      it('SHOULD eventually get a mocked bookmark list: ', () =>
        testedModule
          .getBookmarkList(mockFetch)('foo')
          .then(expectedBookmarkList =>
            expect(expectedBookmarkList).toEqual([
              testedModule.fromJSONToBookmark(MOCK_BOOKMARK_JSON),
            ]),
          ));
    });
  });
});
