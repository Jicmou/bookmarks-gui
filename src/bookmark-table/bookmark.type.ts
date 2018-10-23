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
  title: string;
  type: EType;
  url: string;
  width: number;
}

export type TBookmarkJSONList = IBookmarkJSON[];

export interface IGetBookmarkListResponse {
  bookmarkList: TBookmarkJSONList;
}
