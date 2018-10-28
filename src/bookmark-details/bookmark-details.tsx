import * as React from 'react';
import { IBookmarkWithTagList } from '../bookmark-table/bookmark.type';

export interface IBookmarkDetailsProps {
  bookmark: IBookmarkWithTagList | undefined;
}

export const BookmarkDetails = (props: IBookmarkDetailsProps) =>
  props.bookmark ? (
    <div className="bookmark-details-body">
      <h1 className="bookmark-details-title">{props.bookmark.title}</h1>
      <ul>
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
      </ul>
    </div>
  ) : (
    <div className="no-bookmark">Loading, please wait...</div>
  );
