import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Modal from '@material-ui/core/Modal';

import { Main } from './main';
import { BookmarkDetails } from './bookmark-details/bookmark-details';
import { columnList } from './bookmark-table/columnList';
import { IServerErrorMessage } from './services/bookmark.service.type';
import { TBookmarkList } from './bookmark-table/bookmark.type';

import * as types from './App.type';

import logo from './logo.svg';
import './App.css';

const API_URL = 'http://localhost:8000';
const MODAL_INIT_VALUE: types.IModalState = {
  message: '',
  open: false,
};
const TABLE_INIT_VALUE: types.ITableState = {
  bookmarkListLength: 0,
  columnList,
  currentPage: 0,
  paginatedBookmarkList: [],
  rowsPerPage: types.ERowsPerPAge.FIVE,
};

class App extends React.Component<types.IAppProps, types.IAppState> {
  constructor(props: types.IAppProps) {
    super(props);
    this.state = {
      apiUrl: API_URL,
      bookmarkList: [],
      currentBookmark: undefined,
      inputValue: '',
      modal: MODAL_INIT_VALUE,
      table: TABLE_INIT_VALUE,
    };
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
        <div className="main">
          <Router>
            <div className="routes">
              <Route
                path="/"
                exact={true}
                component={() => (
                  <Main
                    inputValue={this.state.inputValue}
                    onChangePage={this.handleChangePage()}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage()}
                    onDelete={this.handleDelete()}
                    onEdit={this.handleEdit()}
                    onFormSubmit={this.handleFormSubmit(this.state)}
                    onInputChange={this.handleInputChange()}
                    table={this.state.table}
                  />
                )}
              />
              <Route
                path="/bookmark/:bookmarkId"
                component={() => (
                  <BookmarkDetails
                    bookmark={this.state.currentBookmark}
                    tagForm={{
                      inputValue: this.state.inputValue,
                      onFormSubmit: this.handleFormSubmit(this.state),
                      onInputChange: this.handleInputChange(),
                    }}
                  />
                )}
              />
            </div>
          </Router>
        </div>
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

  private handleFormSubmit(state: types.IAppState) {
    return (event: Event) => {
      event.preventDefault();
      this.createBookmark(event)(state.inputValue);
    };
  }

  private handleInputChange() {
    return (event: types.ITargetValueEvent) => {
      this.setState({
        inputValue: event.target.value,
      });
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
            inputValue: '',
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
}

export default App;
