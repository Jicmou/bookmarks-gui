import * as React from 'react';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { ITag } from '../../../../../types/tag.type';

export interface ITagItemProps {
  tag: ITag;
  onTagRemove: (tagId: number) => () => void;
}

export const TagItem = (props: ITagItemProps) => (
  <li className="bookmark-details-tag-list-item" id={`tag-${props.tag.name}`}>
    <span className="tag-name">{props.tag.name}</span>
    <span
      className="tag-delete clickable"
      onClick={props.onTagRemove(props.tag.id)}
    >
      X
    </span>
    {/* <DeleteForeverIcon
      className="clickable"
      id={`delete-bookmark-${props.tag.id}`}
      onClick={props.onTagRemove(props.tag.id)}
    /> */}
  </li>
);
