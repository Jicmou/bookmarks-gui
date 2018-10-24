import * as types from './bookmark-table/bookmark.type';
import { Fetch, ERedirect, EMethod } from './types/fetch.type';

export interface IServerErrorMessage {
  code: number;
  message: string;
}

export const fromJSONToBookmark = (
  bookmarkJSON: types.IBookmarkJSON,
): types.IBookmark => ({
  authorName: bookmarkJSON.authorName,
  creationDate: new Date(bookmarkJSON.creationDate),
  duration: bookmarkJSON.duration,
  height: bookmarkJSON.height,
  id: bookmarkJSON.id,
  title: bookmarkJSON.title,
  type: bookmarkJSON.type,
  url: bookmarkJSON.url,
  width: bookmarkJSON.width,
});

export const getBookmarkList = (fetch: Fetch) => (apiUrl: string) =>
  fetch(`${apiUrl}/v1/bookmarks/`, {
    method: EMethod.GET,
    redirect: ERedirect.FOLLOW,
  })
    .then(response => response.json())
    .then((body: types.IGetBookmarkListResponse) =>
      body.bookmarkList.map(fromJSONToBookmark),
    )
    .catch(() => [] as types.TBookmarkList);

export const createBookmark = (fetch: Fetch) => (apiUrl: string) => (
  link: string,
) =>
  fetch(`${apiUrl}/v1/bookmarks`, {
    body: JSON.stringify({
      url: link,
    }),
    method: EMethod.POST,
    redirect: ERedirect.FOLLOW,
  })
    .then(response => response.json())
    .then(
      body =>
        !body || body.code
          ? Promise.reject(body as IServerErrorMessage)
          : Promise.resolve((body as types.ICreateBookmarkResponse).bookmark),
    )
    .then(fromJSONToBookmark);

export const deleteBookmark = (fetch: Fetch) => (apiUrl: string) => (
  id: number,
) =>
  fetch(`${apiUrl}/v1/bookmarks/${id.toString()}`, {
    method: EMethod.DELETE,
    redirect: ERedirect.FOLLOW,
  }).then(response => {
    if (!response.ok) {
      return Promise.reject(response);
    }
    return Promise.resolve(response);
  });
