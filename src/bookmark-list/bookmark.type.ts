export interface IBookmark {
  addedDate: Date;
  authorName: string;
  title: string;
  url: string;
}

export type TBookmarkList = IBookmark[];
