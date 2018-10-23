import {
  MOCK_BOOKMARK_JSON,
  MOCK_CREATE_BOOKMARK_RESPONSE_BODY,
} from './testing/bookmark.mock';
import {
  injectJsonSuccessResponseToFetch,
  FETCH_STUB_404,
} from './testing/fetch.stub';

import * as testedModule from './bookmark.service';

describe('Bookmark service: ', () => {
  describe('fromJSONToBookmark() ', () => {
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
          .then(bookmarkList =>
            expect(bookmarkList).toEqual([
              testedModule.fromJSONToBookmark(MOCK_BOOKMARK_JSON),
            ]),
          ));
    });
  });

  describe('createBookmark() ', () => {
    describe('GIVEN an invalid link: ', () => {
      it('SHOULD eventually reject the promise: ', done => {
        testedModule
          .createBookmark(FETCH_STUB_404)('foo')('bar')
          .catch(() => done());
      });
    });
    describe('GIVEN a valid link: ', () => {
      const mockFetch = injectJsonSuccessResponseToFetch(
        MOCK_CREATE_BOOKMARK_RESPONSE_BODY,
      );
      it('SHOULD eventually resolve to the newly created bookmark: ', () =>
        testedModule
          .createBookmark(mockFetch)('foo')('bar')
          .then(bookmark =>
            expect(bookmark).toEqual(
              testedModule.fromJSONToBookmark(MOCK_BOOKMARK_JSON),
            ),
          ));
    });
  });
  describe('deleteBookmark() ', () => {
    describe('GIVEN an invalid id: ', () => {
      it('SHOULD eventually reject the promise: ', done => {
        testedModule
          .deleteBookmark(FETCH_STUB_404)('foo')(1234)
          .catch(() => done());
      });
    });
    describe('GIVEN a valid id: ', () => {
      const mockFetch = injectJsonSuccessResponseToFetch(
        MOCK_CREATE_BOOKMARK_RESPONSE_BODY,
      );
      it('SHOULD eventually resolve to the promise: ', done =>
        testedModule
          .deleteBookmark(mockFetch)('foo')(5678)
          .then(() => done()));
    });
  });
});
