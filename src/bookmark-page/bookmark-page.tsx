import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { IBookmarkWithTagList } from '../bookmark-table/bookmark.type';
import { TagForm } from './tag-form';
import { TagList } from './tag-list';
import { BookmarkDetails } from './bookmark-details';
import { IPreventEvent } from '../App.type';

export interface IBookmarkPageProps {
  bookmark: IBookmarkWithTagList | undefined;
  onBookmarkSave: () => void;
  onTagRemove: (tagId: number) => () => void;
  onTagFormSubmit: (tag: string) => (event: IPreventEvent) => void;
}

export const BookmarkPage = (props: IBookmarkPageProps) =>
  props.bookmark ? (
    <div className="bookmark-body">
      <Link to="/">Home</Link>
      <h1 className="bookmark-title">{props.bookmark.title}</h1>
      <BookmarkDetails bookmark={props.bookmark} />
      <TagList
        tagList={props.bookmark.tagList}
        onTagRemove={props.onTagRemove}
      />
      <TagForm onTagFormSubmit={props.onTagFormSubmit} />
      <Button
        className="save-bookmark-button"
        color="primary"
        type="button"
        variant="contained"
        onClick={props.onBookmarkSave}
      >
        Save Bookmark
      </Button>
    </div>
  ) : (
    <div className="no-bookmark">Loading, please wait...</div>
  );
