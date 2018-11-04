import * as React from 'react';

import * as types from '../../../../types/tag.type';
import { TagItem } from './tag-item/tag-item';

export interface ITagListProps {
  tagList: types.TagList;
  onTagRemove: (tagId: number) => () => void;
}

export const TagList = (props: ITagListProps) => (
  <ul className="bookmark-details-tag-list">
    {props.tagList.map(tag => (
      <TagItem
        key={`tag-key-${tag.id}`}
        tag={tag}
        onTagRemove={props.onTagRemove}
      />
    ))}
  </ul>
);
