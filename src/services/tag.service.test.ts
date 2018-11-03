import { MOCK_TAG_RESPONSE_BODY } from './../testing/tag.mock';
import {
  FETCH_STUB_SUCCESS,
  FETCH_STUB_404,
  injectJsonSuccessResponseToFetch,
} from './../testing/fetch.stub';
import { TagList } from '../types/tag.type';

import * as testedModule from './tag.service';

describe('TagService: ', () => {
  describe('getTag(): ', () => {
    describe('GIVEN an invalid id, ', () => {
      it('SHOULD eventually resolve to a 404 response', () => {
        return testedModule
          .getTag(FETCH_STUB_404)('foo')(1234)
          .then((body: any) => expect(body.code).toBe(404));
      });
    });
    describe('GIVEN an valid id, ', () => {
      it('SHOULD eventually resolve to a tag response body', () =>
        testedModule
          .getTag(injectJsonSuccessResponseToFetch(MOCK_TAG_RESPONSE_BODY))(
            'foo',
          )(1234)
          .then((body: any) => expect(body.tag).toBeTruthy()));
    });
  });
  describe('getTagListFromEndpointList', () => {
    describe('GIVEN an empty list: ', () => {
      it('SHOULD eventually resolve to an empty list', () =>
        testedModule
          .getTagListFromEndpointList(FETCH_STUB_SUCCESS)('foo')([])
          .then((tagList: TagList) => expect(tagList.length).toBe(0)));
    });
    describe(`GIVEN a list og one endpoint:
    AND that endpoint is invalid`, () => {
      it('SHOULD eventually resolve to an empty list', () =>
        testedModule
          .getTagListFromEndpointList(FETCH_STUB_404)('foo')([
            `/v1/tags/${Number.MAX_SAFE_INTEGER}`,
          ])
          .then((tagList: TagList) => expect(tagList.length).toBe(0)));
    });
    describe(`GIVEN a list og one endpoint:
    AND that endpoint is valid`, () => {
      it('SHOULD eventually resolve to a list of one tag', () =>
        testedModule
          .getTagListFromEndpointList(
            injectJsonSuccessResponseToFetch(MOCK_TAG_RESPONSE_BODY),
          )('foo')([`/v1/tags/${Number.MAX_SAFE_INTEGER}`])
          .then((tagList: TagList) =>
            expect(tagList).toEqual([MOCK_TAG_RESPONSE_BODY.tag]),
          ));
    });
  });
});
