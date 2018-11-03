import * as React from 'react';
import { Link } from 'react-router-dom';
import { IBookmarkWithTagList } from '../bookmark-table/bookmark.type';
import { TagForm, ITagFormProps } from './tag-form';
import { TagList } from './tag-list';
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
      <TagList tagList={props.bookmark.tagList} />
      <TagForm
        inputValue={props.tagForm.inputValue}
        onFormSubmit={props.tagForm.onFormSubmit}
        onInputChange={props.tagForm.onInputChange}
      />
    </div>
  ) : (
    <div className="no-bookmark">Loading, please wait...</div>
  );
