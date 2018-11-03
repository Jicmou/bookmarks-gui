import { TagList } from '../types/tag.type';
export enum EType {
  PHOTO = 'photo',
  VIDEO = 'video',
}

export interface IBookmark {
  authorName: string;
  creationDate: Date;
  duration: number | null;
  height: number;
  id: number;
  tagList: string[];
  title: string;
  type: EType;
  url: string;
  width: number;
}

export type TBookmarkList = IBookmark[];

export interface IBookmarkJSON {
  authorName: string;
  creationDate: string;
  duration: number | null;
  height: number;
  id: number;
  tags: string[];
  title: string;
  type: EType;
  url: string;
  width: number;
}

export interface IBookmarkWithTagList {
  authorName: string;
  creationDate: Date;
  duration: number | null;
  height: number;
  id: number;
  tagList: TagList;
  title: string;
  type: EType;
  url: string;
  width: number;
}

export type TBookmarkJSONList = IBookmarkJSON[];

export interface IGetBookmarkListResponse {
  bookmarkList: TBookmarkJSONList;
}

export interface IBookmarkResponse {
  bookmark: IBookmarkJSON;
}
