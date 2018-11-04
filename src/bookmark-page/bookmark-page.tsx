import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { BookmarkDetails } from './bookmark-details';
import { IBookmarkWithTagList } from '../bookmark-table/bookmark.type';

import { TagForm, ITagFormProps } from './tag-form';

export interface IBookmarkPageProps extends ITagFormProps {
  bookmark: IBookmarkWithTagList | undefined;
  onBookmarkSave: () => void;
  onTagRemove: (tagId: number) => () => void;
}

export const BookmarkPage = (props: IBookmarkPageProps) =>
  props.bookmark ? (
    <div className="bookmark-body">
      <Link to="/">Home</Link>
      <h1 className="bookmark-title">{props.bookmark.title}</h1>
      <BookmarkDetails
        bookmark={props.bookmark}
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
