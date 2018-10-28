export interface ITag {
  id: number;
  name: string;
}

export type TagList = ITag[];

export interface ITagResponse {
  tag: ITag;
}
