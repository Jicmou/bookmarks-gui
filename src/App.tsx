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
          addTagToBookmarkTagList={
            this.props.bookmarkService.addTagToBookmarkTagList
          }
          onBookmarkFormSubmit={this.handleFormSubmit()}
          onBookmarkSave={this.handleBookmarkSave()}
          onChangePage={this.handleChangePage()}
          onChangeRowsPerPage={this.handleChangeRowsPerPage()}
          onDelete={this.handleDelete()}
          removeTagFromBookmarkById={
            this.props.bookmarkService.removeTagFromBookmarkById
          }
          retrieveCurrentBookmark={this.retrieveCurrentBookmark()}
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
        this.updateTableContent({
          bookmarkList: this.state.bookmarkList,
          currentPage: this.state.table.currentPage,
          rowsPerPage: this.state.table.rowsPerPage,
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
        this.updateTableContent({
          bookmarkList: this.state.bookmarkList,
          currentPage: this.state.table.currentPage,
          rowsPerPage: this.state.table.rowsPerPage,
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

  private handleBookmarkSave() {
    return (currentBookmark: IBookmarkWithTagList) =>
      this.updateBookmark(currentBookmark);
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

  private retrieveCurrentBookmark() {
    return (bookmarkId: number) =>
      this.props.bookmarkService.getBookmarkDetailsWithTagList(
        this.props.fetch,
      )(this.state.apiUrl)(bookmarkId);
  }

  private updateBookmark(bookmark: IBookmarkWithTagList) {
    return this.props.bookmarkService
      .updateBookmark(this.props.fetch)(this.state.apiUrl)(bookmark.id)(
        bookmark.tagList.map(tag => tag.name),
      )
      .then(updatedBookmark => {
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
        bookmarkListLength: args.bookmarkList.length,
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
