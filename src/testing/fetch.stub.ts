import { MOCK_GET_BOOKMARK_LIST_RESPONSE_BODY } from './bookmark.mock';
import { IRequestOptions, Fetch } from '../types/fetch.type';

export const FETCH_STUB_SUCCESS: Fetch = (
  url: string,
  options: IRequestOptions,
) =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_GET_BOOKMARK_LIST_RESPONSE_BODY),
    ok: true,
    status: 200,
  });

export const injectJsonSuccessResponseToFetch = (response: any) => (
  url: string,
  options: IRequestOptions,
) =>
  Promise.resolve({
    json: () => Promise.resolve(response),
    ok: true,
    status: 200,
  });
