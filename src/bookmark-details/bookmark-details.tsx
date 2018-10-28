import * as React from 'react';
import { IBookmarkWithTagList } from '../bookmark-table/bookmark.type';
import { TagForm, ITagFormProps } from './tag-form';

export interface IBookmarkDetailsProps {
  bookmark: IBookmarkWithTagList | undefined;
  tagForm: ITagFormProps;
}

export const BookmarkDetails = (props: IBookmarkDetailsProps) =>
  props.bookmark ? (
    <div className="bookmark-details-body">
      <h1 className="bookmark-details-title">{props.bookmark.title}</h1>
      <ul className="bookmark-details-list">
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
      <TagForm
        inputValue={props.tagForm.inputValue}
        onFormSubmit={props.tagForm.onFormSubmit}
        onInputChange={props.tagForm.onInputChange}
      />
    </div>
  ) : (
    <div className="no-bookmark">Loading, please wait...</div>
  );
