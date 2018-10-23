import * as types from './bookmark-table/bookmark.type';
import { Fetch, ERedirect, EMethod } from './types/fetch.type';

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
    .then(json =>
      (json as types.IGetBookmarkListResponse).bookmarkList.map(
        fromJSONToBookmark,
      ),
    );
