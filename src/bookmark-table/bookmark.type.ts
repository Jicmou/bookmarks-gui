export interface IBookmark {
  addedDate: Date;
  authorName: string;
  id: number;
  title: string;
  url: string;
}

export type TBookmarkList = IBookmark[];
