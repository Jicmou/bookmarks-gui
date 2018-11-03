import * as React from 'react';

import * as types from '../types/tag.type';
import { TagItem } from './tag-item';

export interface ITagListProps {
  tagList: types.TagList;
}

export const TagList = (props: ITagListProps) => (
  <ul className="bookmark-details-tag-list">
    {props.tagList.map(tag => (
      <TagItem
        key={`tag-key-${tag.id}`}
        tag={tag}
        onTagRemove={(tagId: number) => () => {
          // tslint:disable-next-line:no-console
          console.log(tagId);
        }}
      />
    ))}
  </ul>
);
