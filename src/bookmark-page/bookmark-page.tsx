import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { IBookmarkWithTagList } from '../bookmark-table/bookmark.type';
import { TagForm } from './tag-form';
import { TagList } from './tag-list';
import { BookmarkDetails } from './bookmark-details';
import { ITargetValueEvent, IPreventEvent } from '../App.type';

export interface IBookmarkPageProps {
  bookmark: IBookmarkWithTagList | undefined;
  onBookmarkSave: () => void;
  onTagRemove: (tagId: number) => () => void;
  onTagFormSubmit: (inputValue: string) => (event: IPreventEvent) => void;
}

export interface IBookmarkPageState {
  tagForm: {
    inputValue: string;
  };
}

export class BookmarkPage extends React.Component<
  IBookmarkPageProps,
  IBookmarkPageState
> {
  constructor(props: IBookmarkPageProps) {
    super(props);
    this.state = {
      tagForm: {
        inputValue: '',
      },
    };
  }

  public render() {
    return this.props.bookmark ? (
      <div className="bookmark-body">
        <Link to="/">Home</Link>
        <h1 className="bookmark-title">{this.props.bookmark.title}</h1>
        <BookmarkDetails bookmark={this.props.bookmark} />
        <TagList
          tagList={this.props.bookmark.tagList}
          onTagRemove={this.props.onTagRemove}
        />
        <TagForm
          inputValue={this.state.tagForm.inputValue}
          onFormSubmit={this.props.onTagFormSubmit(
            this.state.tagForm.inputValue,
          )}
          onInputChange={this.handleTagFormInputChange()}
        />
        <Button
          className="save-bookmark-button"
          color="primary"
          type="button"
          variant="contained"
          onClick={this.props.onBookmarkSave}
        >
          Save Bookmark
        </Button>
      </div>
    ) : (
      <div className="no-bookmark">Loading, please wait...</div>
    );
  }

  private handleTagFormInputChange() {
    return (event: ITargetValueEvent) => {
      this.setState({
        tagForm: { inputValue: event.target.value },
      });
    };
  }
}
