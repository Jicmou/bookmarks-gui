import * as React from 'react';
import { Link } from 'react-router-dom';
import { IBookmarkWithTagList } from '../bookmark-table/bookmark.type';
import { TagForm } from './tag-form';
import { TagList } from './tag-list';
import { BookmarkDetails } from './bookmark-details';
import { ITargetValueEvent, IPreventEvent } from '../App.type';

export interface IBookmarkDetailsProps {
  bookmark: IBookmarkWithTagList | undefined;
  onTagRemove: (tagId: number) => () => void;
  onFormSubmit: (inputValue: string) => (event: IPreventEvent) => void;
}

export interface IBookmarkPageState {
  tagForm: {
    inputValue: string;
  };
}

export class BookmarkPage extends React.Component<
  IBookmarkDetailsProps,
  IBookmarkPageState
> {
  constructor(props: IBookmarkDetailsProps) {
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
          onFormSubmit={this.props.onFormSubmit(this.state.tagForm.inputValue)}
          onInputChange={this.handleTagFormInputChange()}
        />
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
