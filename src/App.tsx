import * as React from 'react';

import { Main } from './main/main';
import { AppHeader } from './widgets/app-header/app-header';
import { AppModal } from './widgets/app-modal/app-modal';

import { IServerErrorMessage } from './services/bookmark.service.type';
import { TBookmarkList, IBookmarkWithTagList } from './types/bookmark.type';

import * as types from './App.type';
import { INITIAL_STATE } from './App.init';

import logo from './logo.svg';
import './App.css';

class App extends React.Component<types.IAppProps, types.IAppState> {
  constructor(props: types.IAppProps) {
    super(props);
    this.state = INITIAL_STATE;
  }

  public componentDidMount() {
    return this.retrieveBookmarkList();
  }

  public render() {
    return (
      <div className="App">
        <AppHeader logo={logo} title={this.state.title} />
        <Main
          bookmark={this.state.currentBookmark}
          onBookmarkFormSubmit={this.handleFormSubmit()}
          onBookmarkSave={this.handleBookmarkSave()}
          onChangePage={this.handleChangePage()}
          onChangeRowsPerPage={this.handleChangeRowsPerPage()}
          onDelete={this.handleDelete()}
          onEdit={this.handleEdit()}
          onTagFormSubmit={this.handleTagFormSubmit()}
          onTagRemove={this.handleTagRemove()}
          table={this.state.table}
        />
        <AppModal
          message={this.state.modal.message}
          onAppModalClose={this.handleModalClose()}
          open={this.state.modal.open}
        />
      </div>
    );
  }

  private addTagToBookmarkTagList(tag: string) {
    if (this.state.currentBookmark) {
      this.setState({
        currentBookmark: this.props.bookmarkService.addTagToBookmarkTagList(
          this.state.currentBookmark,
        )(tag),
      });
    }
  }

  private closeModal() {
    this.setState({
      modal: {
        message: '',
        open: false,
      },
    });
  }

  private createBookmark(link: string) {
    return this.props.bookmarkService
      .createBookmark(this.props.fetch)(this.state.apiUrl)(link)
      .then(bookmark => {
        this.setState({
          bookmarkList: [...this.state.bookmarkList, bookmark],
        });
      })
      .catch((errorMessage: IServerErrorMessage) => {
        this.displayModal(errorMessage.message);
      });
  }

  private deleteBookmark(bookmarkId: number) {
    return this.props.bookmarkService
      .deleteBookmark(this.props.fetch)(this.state.apiUrl)(bookmarkId)
      .then(() => {
        this.setState({
          bookmarkList: this.props.bookmarkService.removeBookmarkFromList(
            this.state.bookmarkList,
          )(bookmarkId),
        });
      });
  }

  private displayModal(message: string) {
    this.setState({
      modal: {
        message,
        open: true,
      },
    });
  }

  private editBookmark(bookmarkId: number) {
    return this.props.bookmarkService
      .getBookmarkDetailsWithTagList(this.props.fetch)(this.state.apiUrl)(
        bookmarkId,
      )
      .then(bookmarkDetails =>
        this.setState({ currentBookmark: bookmarkDetails }),
      );
  }

  private handleBookmarkSave() {
    return () => {
      if (this.state.currentBookmark) {
        this.updateBookmark(this.state.currentBookmark);
      }
    };
  }

  private handleChangePage() {
    return (
      event: React.MouseEvent<HTMLButtonElement> | null,
      page: number,
    ) => {
      this.updateTableContent({
        bookmarkList: this.state.bookmarkList,
        currentPage: page,
        rowsPerPage: this.state.table.rowsPerPage,
      });
    };
  }

  private handleChangeRowsPerPage() {
    return (event: types.ITargetValueEvent) => {
      this.updateTableContent({
        bookmarkList: this.state.bookmarkList,
        currentPage: this.state.table.currentPage,
        rowsPerPage: parseInt(event.target.value, 10),
      });
    };
  }

  private handleDelete() {
    return (bookmarkId: number) => () => this.deleteBookmark(bookmarkId);
  }

  private handleEdit() {
    return (bookmarkId: number) => () => this.editBookmark(bookmarkId);
  }

  private handleFormSubmit() {
    return (link: string) => (event: Event) => {
      event.preventDefault();
      this.createBookmark(link);
    };
  }

  private handleModalClose() {
    return () => {
      this.closeModal();
    };
  }

  private handleTagFormSubmit() {
    return (tag: string) => (event: Event) => {
      event.preventDefault();
      this.addTagToBookmarkTagList(tag);
    };
  }

  private handleTagRemove() {
    return (tagId: number) => () => {
      this.removeTagFromBookmarkById(tagId);
    };
  }

  private removeTagFromBookmarkById(tagId: number) {
    if (this.state.currentBookmark) {
      this.setState({
        currentBookmark: this.props.bookmarkService.removeTagFromBookmarkById(
          this.state.currentBookmark,
        )(tagId),
      });
    }
  }

  private retrieveBookmarkList() {
    return this.props.bookmarkService
      .getBookmarkList(this.props.fetch)(this.state.apiUrl)
      .then(bookmarkList => {
        this.setState({
          bookmarkList,
          table: {
            ...this.state.table,
            bookmarkListLength: bookmarkList.length,
          },
        });
        this.updateTableContent({
          bookmarkList,
          currentPage: this.state.table.currentPage,
          rowsPerPage: this.state.table.rowsPerPage,
        });
      });
  }

  private updateBookmark(bookmark: IBookmarkWithTagList) {
    return this.props.bookmarkService
      .updateBookmark(this.props.fetch)(this.state.apiUrl)(bookmark.id)(
        bookmark.tagList.map(tag => tag.name),
      )
      .then(updatedBookmark => {
        this.setState({ currentBookmark: updatedBookmark });
        this.displayModal(`${updatedBookmark.title} succesfully updated`);
      });
  }

  private updateTableContent(args: {
    currentPage: number;
    rowsPerPage: types.ERowsPerPAge;
    bookmarkList: TBookmarkList;
  }) {
    this.setState({
      table: {
        ...this.state.table,
        currentPage: args.currentPage,
        paginatedBookmarkList: args.bookmarkList.slice(
          args.currentPage * args.rowsPerPage,
          args.currentPage * args.rowsPerPage + args.rowsPerPage,
        ),
        rowsPerPage: args.rowsPerPage,
      },
    });
  }
}

export default App;
