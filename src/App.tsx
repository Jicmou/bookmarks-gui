import * as React from 'react';
import Modal from '@material-ui/core/Modal';

import { Main } from './main';
import { IServerErrorMessage } from './services/bookmark.service.type';
import {
  TBookmarkList,
  IBookmarkWithTagList,
} from './bookmark-table/bookmark.type';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bookmark Manager</h1>
        </header>
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
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="modal"
          open={this.state.modal.open}
          onClose={this.handleModalClose()}
        >
          <div className="modal-content" id="simple-modal-descriptio">
            {this.state.modal.message}
          </div>
        </Modal>
      </div>
    );
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
      // tslint:disable-next-line:no-console
      console.log('Sending link: ', link);
      event.preventDefault();
      this.createBookmark(event)(link);
    };
  }

  private handleTagFormSubmit() {
    return (inputValue: string) => (event: Event) => {
      event.preventDefault();
      if (this.state.currentBookmark) {
        this.setState({
          currentBookmark: this.props.bookmarkService.addTagToBookmarkTagList(
            this.state.currentBookmark,
          )(inputValue),
        });
      }
    };
  }

  private handleTagRemove() {
    return (tagId: number) => () => {
      this.removeTagFromBookmarkById(tagId);
    };
  }

  private handleModalClose() {
    return () => {
      this.setState({
        modal: {
          message: '',
          open: false,
        },
      });
    };
  }

  private createBookmark(event: Event) {
    return (link: string) =>
      this.props.bookmarkService
        .createBookmark(this.props.fetch)(this.state.apiUrl)(link)
        .then(bookmark => {
          this.setState({
            bookmarkList: [...this.state.bookmarkList, bookmark],
          });
        })
        .catch((errorMessage: IServerErrorMessage) => {
          this.setState({
            modal: {
              message: errorMessage.message,
              open: true,
            },
          });
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

  private editBookmark(bookmarkId: number) {
    return this.props.bookmarkService
      .getBookmarkDetailsWithTagList(this.props.fetch)(this.state.apiUrl)(
        bookmarkId,
      )
      .then(bookmarkDetails =>
        this.setState({ currentBookmark: bookmarkDetails }),
      );
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

  private removeTagFromBookmarkById(tagId: number) {
    if (this.state.currentBookmark) {
      this.setState({
        currentBookmark: this.props.bookmarkService.removeTagFromBookmarkById(
          this.state.currentBookmark,
        )(tagId),
      });
    }
  }

  private updateBookmark(bookmark: IBookmarkWithTagList) {
    return this.props.bookmarkService
      .updateBookmark(this.props.fetch)(this.state.apiUrl)(bookmark.id)(
        bookmark.tagList.map(tag => tag.name),
      )
      .then(updatedBookmark =>
        this.setState({ currentBookmark: updatedBookmark }),
      );
  }
}

export default App;
