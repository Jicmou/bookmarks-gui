import * as React from 'react';

import { IBookmarkWithTagList } from '../../../types/bookmark.type';
import { TagList } from './tag-list/tag-list';

export interface IBookmarkDetailsProps {
  bookmark: IBookmarkWithTagList;
  onTagRemove: (tagId: number) => () => void;
}

export const BookmarkDetails = (props: IBookmarkDetailsProps) => (
  <ul className="bookmark-details-list">
    <li className="bookmark-details-item">
      <span className="bookmark-details-item-label">author name:</span>
      <span className="bookmark-details-item-value">
        {props.bookmark.authorName}
      </span>
    </li>
    <li className="bookmark-details-item">
      <span className="bookmark-details-item-label">added date:</span>
      <span className="bookmark-details-item-value">
        {props.bookmark.creationDate.toString()}
      </span>
    </li>
    <li className="bookmark-details-item">
      <span className="bookmark-details-item-label">height:</span>
      <span className="bookmark-details-item-value">
        {props.bookmark.height}
      </span>
    </li>
    <li className="bookmark-details-item">
      <span className="bookmark-details-item-label">type:</span>
      <span className="bookmark-details-item-value">{props.bookmark.type}</span>
    </li>
    <li className="bookmark-details-item">
      <span className="bookmark-details-item-label">url:</span>
      <span className="bookmark-details-item-value">
        <a href={props.bookmark.url} target="blank">
          {props.bookmark.url}
        </a>
      </span>
    </li>
    <li className="bookmark-details-item">
      <span className="bookmark-details-item-label">width:</span>
      <span className="bookmark-details-item-value">
        {props.bookmark.width}
      </span>
    </li>
    <li className="bookmark-details-item">
      <span className="bookmark-details-item-label">
        {props.bookmark.duration && 'duration:'}
      </span>
      <span className="bookmark-details-item-value">
        {props.bookmark.duration}
      </span>
    </li>
    <li className="bookmark-details-item">
      <span className="bookmark-details-item-label">tags:</span>
      <TagList
        tagList={props.bookmark.tagList}
        onTagRemove={props.onTagRemove}
      />
    </li>
  </ul>
);
