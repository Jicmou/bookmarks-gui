import * as React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import HomeIcon from '@material-ui/icons/Home';

import { IBookmarkWithTagList } from '../../types/bookmark.type';
import { ERoutePath } from '../../types/route-path.enum';

import { BookmarkDetails } from './bookmark-details/bookmark-details';
import { TagForm } from './tag-form/tag-form';

import './bookmark-page.css';

export interface IBookmarkPageParams {
  bookmarkId: string;
}

export interface IBookmarkPageProps {
  addTagToBookmarkTagList: (
    bookmark: IBookmarkWithTagList,
  ) => (tagName: string) => IBookmarkWithTagList;
  onBookmarkSave: (bookmark: IBookmarkWithTagList) => void;
  removeTagFromBookmarkById: (
    bookmark: IBookmarkWithTagList,
  ) => (tagId: number) => IBookmarkWithTagList;
  retrieveCurrentBookmark: (
    bookmarkId: number,
  ) => Promise<IBookmarkWithTagList>;
}

export type BookmarkPagePropsWithRouteProps = IBookmarkPageProps &
  RouteComponentProps<IBookmarkPageParams>;

export interface IBookmarkPageState {
  currentBookmark: IBookmarkWithTagList | undefined;
}

export class BookmarkPage extends React.Component<
  BookmarkPagePropsWithRouteProps,
  IBookmarkPageState
> {
  constructor(props: BookmarkPagePropsWithRouteProps) {
    super(props);
    this.state = {
      currentBookmark: undefined,
    };
  }

  public componentDidMount() {
    return this.retrieveCurrentBookmark(
      parseInt(this.props.match.params.bookmarkId, 10),
    );
  }

  public componentWillUnmount() {
    this.setState({ currentBookmark: undefined });
  }

  public render() {
    return this.state.currentBookmark ? (
      <div className="bookmark-body">
        <Link to={ERoutePath.HOME_PAGE}>
          <HomeIcon className="clickable" />
        </Link>
        <Paper className="bookmark-details" elevation={1}>
          <h1 className="bookmark-title">{this.state.currentBookmark.title}</h1>
          <BookmarkDetails
            bookmark={this.state.currentBookmark}
            onTagRemove={this.handleOnTagRemove()}
          />
          <TagForm onTagFormSubmit={this.handleTagFormSubmit()} />
          <Button
            className="save-bookmark-button"
            color="primary"
            type="button"
            variant="contained"
            onClick={this.handleBookmarkSaveClick()}
          >
            Save Bookmark
          </Button>
        </Paper>
      </div>
    ) : (
      <div className="no-bookmark">Loading, please wait...</div>
    );
  }

  private addTagToBookmarkTagList(tag: string) {
    if (this.state.currentBookmark) {
      this.setState({
        currentBookmark: this.props.addTagToBookmarkTagList(
          this.state.currentBookmark,
        )(tag),
      });
    }
  }

  private handleOnTagRemove() {
    return (tagId: number) => () => {
      if (this.state.currentBookmark) {
        this.setState({
          currentBookmark: this.props.removeTagFromBookmarkById(
            this.state.currentBookmark,
          )(tagId),
        });
      }
    };
  }

  private handleBookmarkSaveClick() {
    return () => {
      if (this.state.currentBookmark) {
        return this.props.onBookmarkSave(this.state.currentBookmark);
      }
    };
  }

  private handleTagFormSubmit() {
    return (tag: string) => (event: Event) => {
      event.preventDefault();
      this.addTagToBookmarkTagList(tag);
    };
  }

  private retrieveCurrentBookmark(bookmarkId: number) {
    return this.props
      .retrieveCurrentBookmark(bookmarkId)
      .then(bookmarkDetails =>
        this.setState({ currentBookmark: bookmarkDetails }),
      );
  }
}

export const RoutedBookmarkPage = withRouter(BookmarkPage);
