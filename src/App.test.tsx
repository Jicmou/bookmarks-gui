import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import * as bookmarkTypes from './types/bookmark.type';
import { Fetch } from './types/fetch.type';
import { FETCH_STUB_SUCCESS } from './testing/fetch.stub';
import { IBookmarkService } from './services/bookmark.service.type';
import {
  MOCK_BOOKMARK,
  MOCK_BOOKMARK_LIST,
  MOCK_BOOKMARK_WITH_TAG_LIST,
} from './testing/bookmark.mock';

export interface IResponse {
  json: () => Promise<any>;
  ok: boolean;
  status: number;
}

const MOCK_RESPONSE: IResponse = {
  json: () => Promise.resolve(),
  ok: true,
  status: 200,
};

const bookmarkServicetub: IBookmarkService = {
  addTagToBookmarkTagList: (bookmark: bookmarkTypes.IBookmarkWithTagList) => (
    tagName: string,
  ) => MOCK_BOOKMARK_WITH_TAG_LIST,
  createBookmark: (fetch: Fetch) => (apiUrl: string) => (link: string) =>
    Promise.resolve(MOCK_BOOKMARK),
  deleteBookmark: (fetch: Fetch) => (apiUrl: string) => (id: number) =>
    Promise.resolve(MOCK_RESPONSE),
  fromJSONToBookmark: (bookmarkJSON: bookmarkTypes.IBookmarkJSON) =>
    MOCK_BOOKMARK,
  getBookmarkDetailsWithTagList: (fetch: Fetch) => (apiUrl: string) => (
    id: number,
  ) => Promise.resolve(MOCK_BOOKMARK_WITH_TAG_LIST),
  getBookmarkList: (fetch: Fetch) => (apiUrl: string) =>
    Promise.resolve(MOCK_BOOKMARK_LIST),
  removeBookmarkFromList: (bookmarkList: bookmarkTypes.TBookmarkList) => (
    bookmarkId: number,
  ) => MOCK_BOOKMARK_LIST,
  removeTagFromBookmarkById: (bookmark: bookmarkTypes.IBookmarkWithTagList) => (
    tagId: number,
  ) => MOCK_BOOKMARK_WITH_TAG_LIST,
  updateBookmark: (fetch: Fetch) => (apiUrl: string) => (id: number) => (
    tagNameList: string[],
  ) => Promise.resolve(MOCK_BOOKMARK_WITH_TAG_LIST),
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App fetch={FETCH_STUB_SUCCESS} bookmarkService={bookmarkServicetub} />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
