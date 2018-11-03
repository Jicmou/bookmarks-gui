import * as React from 'react';
import { Link } from 'react-router-dom';
import { IBookmarkWithTagList } from '../bookmark-table/bookmark.type';
import { TagForm, ITagFormProps } from './tag-form';
import { TagItem } from './tag-item';
import { BookmarkDetails } from './bookmark-details';

export interface IBookmarkDetailsProps {
  bookmark: IBookmarkWithTagList | undefined;
  tagForm: ITagFormProps;
}

export const BookmarkPage = (props: IBookmarkDetailsProps) =>
  props.bookmark ? (
    <div className="bookmark-body">
      <Link to="/">Home</Link>
      <h1 className="bookmark-title">{props.bookmark.title}</h1>
      <BookmarkDetails bookmark={props.bookmark} />
      <ul className="bookmark-details-tag-list">
        {props.bookmark.tagList.map(tag => (
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
      <TagForm
        inputValue={props.tagForm.inputValue}
        onFormSubmit={props.tagForm.onFormSubmit}
        onInputChange={props.tagForm.onInputChange}
      />
    </div>
  ) : (
    <div className="no-bookmark">Loading, please wait...</div>
  );
