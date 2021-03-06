import { TagList } from './../types/tag.type';
import * as bookmarkTypes from '../types/bookmark.type';
import * as types from './bookmark.service.type';
import { Fetch, EMethod, ERedirect } from '../types/fetch.type';
import { getTagListFromEndpointList } from './tag.service';

export const fromJSONToBookmark = (
  bookmarkJSON: bookmarkTypes.IBookmarkJSON,
): bookmarkTypes.IBookmark => ({
  authorName: bookmarkJSON.authorName,
  creationDate: new Date(bookmarkJSON.creationDate),
  duration: bookmarkJSON.duration,
  height: bookmarkJSON.height,
  id: bookmarkJSON.id,
  tagList: bookmarkJSON.tags,
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
    .then((body: bookmarkTypes.IGetBookmarkListResponse) =>
      body.bookmarkList.map(fromJSONToBookmark),
    )
    .catch(() => [] as bookmarkTypes.TBookmarkList);

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
          ? Promise.reject(body as types.IServerErrorMessage)
          : Promise.resolve((body as bookmarkTypes.IBookmarkResponse).bookmark),
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

export const removeBookmarkFromList = (
  bookmarkList: bookmarkTypes.TBookmarkList,
) => (bookmarkId: number) =>
  bookmarkList.filter(bookmark => bookmark.id !== bookmarkId);

export const getBookmarkDetails = (fetch: Fetch) => (apiUrl: string) => (
  id: number,
) =>
  fetch(`${apiUrl}/v1/bookmarks/${id.toString()}`, {
    method: EMethod.GET,
    redirect: ERedirect.FOLLOW,
  })
    .then(
      response =>
        response.ok ? Promise.resolve(response) : Promise.reject(response),
    )
    .then(
      response => response.json() as Promise<bookmarkTypes.IBookmarkResponse>,
    )
    .then(body => fromJSONToBookmark(body.bookmark));

export const getBookmarkDetailsWithTagList = (fetch: Fetch) => (
  apiUrl: string,
) => (id: number) =>
  getBookmarkDetails(fetch)(apiUrl)(id).then(bookmark =>
    getTagListFromEndpointList(fetch)(apiUrl)(bookmark.tagList).then(
      tagList =>
        ({
          ...bookmark,
          tagList,
        } as bookmarkTypes.IBookmarkWithTagList),
    ),
  );

export const removeTagFromBookmarkById = (
  bookmark: bookmarkTypes.IBookmarkWithTagList,
) => (tagId: number): bookmarkTypes.IBookmarkWithTagList => ({
  ...bookmark,
  tagList: bookmark.tagList.filter(tag => tag.id !== tagId),
});

export const attributeIdToNewTag = (tagList: TagList) =>
  Math.max(...tagList.map(tag => tag.id), 0) + 1;

export const addTagToBookmarkTagList = (
  bookmark: bookmarkTypes.IBookmarkWithTagList,
) => (tagName: string): bookmarkTypes.IBookmarkWithTagList => ({
  ...bookmark,
  tagList: [
    ...bookmark.tagList,
    {
      id: attributeIdToNewTag(bookmark.tagList),
      name: tagName,
    },
  ],
});

export const updateBookmark = (fetch: Fetch) => (apiUrl: string) => (
  id: number,
) => (tagNameList: string[]) =>
  fetch(`${apiUrl}/v1/bookmarks/${id.toString()}`, {
    body: JSON.stringify({
      tagNameList,
    }),
    method: EMethod.PUT,
    redirect: ERedirect.FOLLOW,
  })
    .then(response => response.json())
    .then(
      body =>
        !body || body.code
          ? Promise.reject(body as types.IServerErrorMessage)
          : Promise.resolve((body as bookmarkTypes.IBookmarkResponse).bookmark),
    )
    .then(fromJSONToBookmark)
    .then(bookmark =>
      getTagListFromEndpointList(fetch)(apiUrl)(bookmark.tagList).then(
        tagList =>
          ({
            ...bookmark,
            tagList,
          } as bookmarkTypes.IBookmarkWithTagList),
      ),
    );
