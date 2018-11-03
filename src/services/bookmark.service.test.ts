import { TagList } from './../types/tag.type';
import { MOCK_BOOKMARK_WITH_TAG_LIST } from './../testing/bookmark.mock';
import {
  IBookmarkWithTagList,
  IBookmarkJSON,
} from '../bookmark-table/bookmark.type';
import {
  MOCK_BOOKMARK,
  MOCK_BOOKMARK_JSON,
  MOCK_BOOKMARK_LIST,
  MOCK_BOOKMARK_RESPONSE_BODY,
} from '../testing/bookmark.mock';
import {
  injectJsonSuccessResponseToFetch,
  FETCH_STUB_404,
} from '../testing/fetch.stub';

import * as testedModule from './bookmark.service';

describe('Bookmark service: ', () => {
  describe('fromJSONToBookmark() ', () => {
    describe('GIVEN a JSON Bookmark, ', () => {
      it('SHOULD return a bookmark', () => {
        expect(testedModule.fromJSONToBookmark(MOCK_BOOKMARK_JSON)).toEqual({
          authorName: MOCK_BOOKMARK_JSON.authorName,
          creationDate: new Date(MOCK_BOOKMARK_JSON.creationDate),
          duration: MOCK_BOOKMARK_JSON.duration,
          height: MOCK_BOOKMARK_JSON.height,
          id: MOCK_BOOKMARK_JSON.id,
          tagList: MOCK_BOOKMARK_JSON.tags,
          title: MOCK_BOOKMARK_JSON.title,
          type: MOCK_BOOKMARK_JSON.type,
          url: MOCK_BOOKMARK_JSON.url,
          width: MOCK_BOOKMARK_JSON.width,
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
        MOCK_BOOKMARK_RESPONSE_BODY,
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
        MOCK_BOOKMARK_RESPONSE_BODY,
      );
      it('SHOULD eventually resolve to the promise: ', done =>
        testedModule
          .deleteBookmark(mockFetch)('foo')(5678)
          .then(() => done()));
    });
  });

  describe('removeBookmarkFromList() ', () => {
    describe(`GIVEN a bookmark list,
      AND a bookmark id that is not on the list`, () => {
      it('SHOULD return the same bookmark list', () => {
        expect(
          testedModule.removeBookmarkFromList(MOCK_BOOKMARK_LIST)(999),
        ).toEqual(MOCK_BOOKMARK_LIST);
      });
    });
    describe(`GIVEN a bookmark list,
      AND a bookmark id that is not on the list`, () => {
      const mockId = Number.MAX_SAFE_INTEGER;
      const expectedMockList = [
        MOCK_BOOKMARK,
        {
          ...MOCK_BOOKMARK,
          id: 2,
        },
        {
          ...MOCK_BOOKMARK,
          id: 3,
        },
      ];
      const mockBookmarkList = [
        ...expectedMockList,
        {
          ...MOCK_BOOKMARK,
          id: mockId,
        },
      ];
      it('SHOULD return the same bookmark list', () => {
        expect(
          testedModule.removeBookmarkFromList(mockBookmarkList)(mockId).length,
        ).toEqual(expectedMockList.length);
        expect(
          testedModule.removeBookmarkFromList(mockBookmarkList)(mockId),
        ).toEqual(expectedMockList);
      });
    });
  });

  describe('getBookmarkDetails(): ', () => {
    describe('GIVEN an invalid bookmark id', () => {
      it('SHOULD eventually reject the promise: ', done => {
        testedModule
          .getBookmarkDetails(FETCH_STUB_404)('foo')(1234)
          .catch(() => done());
      });
    });
    describe('GIVEN a valid id: ', () => {
      const mockFetch = injectJsonSuccessResponseToFetch(
        MOCK_BOOKMARK_RESPONSE_BODY,
      );
      it('SHOULD eventually resolve to a bookmark json: ', () =>
        testedModule
          .getBookmarkDetails(mockFetch)('foo')(5678)
          .then(bookmark =>
            expect(bookmark).toEqual({
              ...testedModule.fromJSONToBookmark(MOCK_BOOKMARK_JSON),
            }),
          ));
    });
  });
  describe('getBookmarkDetailsWithTagList(): ', () => {
    describe('GIVEN an invalid bookmark id', () => {
      it('SHOULD eventually reject the promise: ', done => {
        testedModule
          .getBookmarkDetailsWithTagList(FETCH_STUB_404)('foo')(1234)
          .catch(() => done());
      });
    });
    describe('GIVEN a valid id: ', () => {
      const mockBookmarkJson: IBookmarkJSON = {
        ...MOCK_BOOKMARK_JSON,
        tags: ['/v1/tags/1', '/v1/tags/2', '/v1/tags/3', '/v1/tags/4'],
      };
      const mockFetch = injectJsonSuccessResponseToFetch({
        bookmark: mockBookmarkJson,
      });
      it(`SHOULD eventually resolve to a bookmark with tag list`, () => {
        const getIdFromEndpoint = (endpoint: string) =>
          parseInt(
            endpoint
              .split('/')
              .find(
                (value, index, array) => index === array.length - 1,
              ) as string,
            10,
          );
        return testedModule
          .getBookmarkDetailsWithTagList(mockFetch)('foo')(5678)
          .then((bookmark: IBookmarkWithTagList) =>
            bookmark.tagList.map((tag, index) =>
              expect(tag.id).toBe(
                getIdFromEndpoint(mockBookmarkJson.tags[index]),
              ),
            ),
          );
      });
    });
  });
  describe('removeTagFromBookmarkById(): ', () => {
    describe(`GIVEN a tag id,
    AND a bookmark with an empty Tag List`, () => {
      const mockBookmark: IBookmarkWithTagList = {
        ...MOCK_BOOKMARK_WITH_TAG_LIST,
        tagList: [],
      };
      it('SHOULD return a bookmark with an empty Tag List', () => {
        expect(testedModule.removeTagFromBookmarkById(mockBookmark)(1)).toEqual(
          mockBookmark,
        );
      });
    });
    describe(`GIVEN an tag id,
    AND a bookmark whose tag list has no tag with given id`, () => {
      const mockBookmark: IBookmarkWithTagList = {
        ...MOCK_BOOKMARK_WITH_TAG_LIST,
        tagList: [
          {
            id: 1234,
            name: 'foo',
          },
        ],
      };
      it('SHOULD return a bookmark with an empty Tag List', () => {
        expect(
          testedModule.removeTagFromBookmarkById(mockBookmark)(
            Number.MAX_SAFE_INTEGER,
          ),
        ).toEqual(mockBookmark);
      });
    });
    describe(`GIVEN an tag id,
    AND a bookmark whose tag list has one tag with given id`, () => {
      const mockBookmark: IBookmarkWithTagList = {
        ...MOCK_BOOKMARK_WITH_TAG_LIST,
        tagList: [
          {
            id: 1234,
            name: 'foo',
          },
          {
            id: 5678,
            name: 'bar',
          },
        ],
      };
      it('SHOULD return a bookmark whith same taglist, minus the tag with given id', () => {
        expect(
          testedModule.removeTagFromBookmarkById(mockBookmark)(1234),
        ).toEqual({
          ...mockBookmark,
          tagList: [
            {
              id: 5678,
              name: 'bar',
            },
          ],
        });
      });
    });
  });
  describe('attributeIdToNewTag(): ', () => {
    describe(`GIVEN a empty tag list`, () => {
      it('SHOULD return 1', () => {
        expect(testedModule.attributeIdToNewTag([])).toBe(1);
      });
    });
    describe(`GIVEN a tag list with one tag
    AND tag id is 1`, () => {
      const mockTagList: TagList = [
        {
          id: 1,
          name: 'foo',
        },
      ];
      it('SHOULD return 2', () => {
        expect(testedModule.attributeIdToNewTag(mockTagList)).toBe(2);
      });
    });
    describe(`GIVEN a tag list with multiple tags`, () => {
      const mockTagList: TagList = [
        {
          id: 1,
          name: 'foo',
        },
        {
          id: 2,
          name: 'foo',
        },
        {
          id: 4,
          name: 'foo',
        },
        {
          id: 100,
          name: 'foo',
        },
      ];
      it('SHOULD return highest id + 1', () => {
        expect(testedModule.attributeIdToNewTag(mockTagList)).toBe(101);
      });
    });
  });
  describe('addTagToBookmarkTagList(): ', () => {
    describe(`GIVEN a tag name
    AND a bookmark with an empty tag list`, () => {
      const mockBookmark: IBookmarkWithTagList = {
        ...MOCK_BOOKMARK_WITH_TAG_LIST,
        tagList: [],
      };
      const mockTagName = 'foo';
      it('SHOULD add a newly created tag to the bookmark tag list', () => {
        expect(
          testedModule.addTagToBookmarkTagList(mockBookmark)(mockTagName),
        ).toEqual({
          ...mockBookmark,
          tagList: [
            {
              id: 1,
              name: mockTagName,
            },
          ],
        });
      });
    });
    describe(`GIVEN a tag name
    AND a bookmark with a tag list
    AND highest tag id is 999`, () => {
      const mockBookmark: IBookmarkWithTagList = {
        ...MOCK_BOOKMARK_WITH_TAG_LIST,
        tagList: [
          {
            id: 999,
            name: 'bar',
          },
          {
            id: 1,
            name: 'baz',
          },
        ],
      };
      const mockTagName = 'foo';
      it('SHOULD add a newly created tag to the bookmark tag list', () => {
        expect(
          testedModule.addTagToBookmarkTagList(mockBookmark)(mockTagName),
        ).toEqual({
          ...mockBookmark,
          tagList: [
            ...mockBookmark.tagList,
            {
              id: 1000,
              name: mockTagName,
            },
          ],
        });
      });
    });
  });
});
