import * as bookmarkTypes from '../bookmark-table/bookmark.type';
import { Fetch, IResponse } from '../types/fetch.type';

export interface IBookmarkService {
  fromJSONToBookmark: (
    bookmarkJSON: bookmarkTypes.IBookmarkJSON,
  ) => bookmarkTypes.IBookmark;
  getBookmarkList: (
    fetch: Fetch,
  ) => (apiUrl: string) => Promise<bookmarkTypes.TBookmarkList>;
  createBookmark: (
    fetch: Fetch,
  ) => (apiUrl: string) => (link: string) => Promise<bookmarkTypes.IBookmark>;
  deleteBookmark: (
    fetch: Fetch,
  ) => (apiUrl: string) => (id: number) => Promise<IResponse>;
  removeBookmarkFromList: (
    bookmarkList: bookmarkTypes.TBookmarkList,
  ) => (bookmarkId: number) => bookmarkTypes.TBookmarkList;
}

export interface IServerErrorMessage {
  code: number;
  message: string;
}
