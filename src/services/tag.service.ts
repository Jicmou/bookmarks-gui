import { ITagResponse } from '../types/tag.type';
import { EMethod, ERedirect, Fetch } from './../types/fetch.type';

export const getTag = (fetch: Fetch) => (apiUrl: string) => (id: number) =>
  fetch(`${apiUrl}/v1/tags/${id.toString()}`, {
    method: EMethod.GET,
    redirect: ERedirect.FOLLOW,
  }).then(response => response.json());

export const getTagByEndpoint = (fetch: Fetch) => (endPoint: string) =>
  fetch(`${endPoint}`, {
    method: EMethod.GET,
    redirect: ERedirect.FOLLOW,
  }).then(response => response.json());

export const getTagListFromEndpointList = (fetch: Fetch) => (
  endPointList: string[],
) =>
  Promise.all(
    endPointList.map(endPoint => getTagByEndpoint(fetch)(endPoint)),
  ).then(bodyList =>
    bodyList
      .filter((body): body is ITagResponse => body.tag)
      .map(tagResponse => tagResponse.tag),
  );
