import * as React from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { ITag } from '../../../../../types/tag.type';

export interface ITagItemProps {
  tag: ITag;
  onTagRemove: (tagId: number) => () => void;
}

export const TagItem = (props: ITagItemProps) => (
  <li id={`tag-${props.tag.name}`}>
    <span>{props.tag.name}</span>
    <DeleteForeverIcon
      className="clickable"
      id={`delete-bookmark-${props.tag.id}`}
      onClick={props.onTagRemove(props.tag.id)}
    />
  </li>
);
