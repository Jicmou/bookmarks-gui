import * as React from 'react';
import { IBookmarkWithTagList } from '../bookmark-table/bookmark.type';
import { TagList } from './tag-list';

export interface IBookmarkDetailsProps {
  bookmark: IBookmarkWithTagList;
  onTagRemove: (tagId: number) => () => void;
}

export const BookmarkDetails = (props: IBookmarkDetailsProps) => (
  <ul className="bookmark-details">
    <li>
      <span>authorName: {props.bookmark.authorName}</span>
    </li>
    <li>
      <span>creationDate: {props.bookmark.creationDate.toString()}</span>
    </li>
    <li>
      <span>duration: {props.bookmark.duration}</span>
    </li>
    <li>
      <span>height: {props.bookmark.height}</span>
    </li>
    <li>
      <span>type: {props.bookmark.type}</span>
    </li>
    <li>
      <span>url: {props.bookmark.url}</span>
    </li>
    <li>
      <span>width: {props.bookmark.width}</span>
    </li>
    <li>
      <TagList
        tagList={props.bookmark.tagList}
        onTagRemove={props.onTagRemove}
      />
    </li>
  </ul>
);
