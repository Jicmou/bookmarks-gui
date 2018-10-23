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

export const FETCH_STUB_400: Fetch = (url: string, options: IRequestOptions) =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        code: 400,
        message: 'Request Error',
      }),
    ok: false,
    status: 400,
  });

export const FETCH_STUB_404: Fetch = (url: string, options: IRequestOptions) =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        code: 404,
        message: 'Ressource not Found',
      }),
    ok: false,
    status: 404,
  });

export const FETCH_STUB_500: Fetch = (url: string, options: IRequestOptions) =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        code: 500,
        message: 'Server Error',
      }),
    ok: false,
    status: 500,
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
