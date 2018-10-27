import * as React from 'react';
import Modal from '@material-ui/core/Modal';

import { Main } from './main';
import { columnList } from './bookmark-table/columnList';
import { IServerErrorMessage } from './bookmark.service.type';

import * as types from './App.type';

import logo from './logo.svg';
import './App.css';

const API_URL = 'http://localhost:8000';
const MODAL_INIT_VALUE = {
  message: '',
  open: false,
};
const TABLE_INIT_VALUE = {
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
      inputValue: '',
      modal: MODAL_INIT_VALUE,
      table: TABLE_INIT_VALUE,
    };
  }
  public componentDidMount() {
    this.retrieveBookmarkList();
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bookmark Manager</h1>
        </header>
        <div className="main">
          <Main
            bookmarkList={this.state.bookmarkList}
            columnList={this.state.table.columnList}
            inputValue={this.state.inputValue}
            onDelete={this.handleDelete()}
            onFormSubmit={this.handleFormSubmit(this.state)}
            onInputChange={this.handleInputChange()}
          />
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

  private handleDelete() {
    return (bookmarkId: number) => () => this.deleteBookmark(bookmarkId);
  }

  private handleFormSubmit(state: types.IAppState) {
    return (event: Event) => {
      event.preventDefault();
      this.createBookmark(event)(state.inputValue);
    };
  }

  private handleInputChange() {
    return (event: types.IInputEvent) => {
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

  private retrieveBookmarkList() {
    return this.props.bookmarkService
      .getBookmarkList(this.props.fetch)(this.state.apiUrl)
      .then(bookmarkList => {
        this.setState({
          bookmarkList,
        });
      });
  }
}

export default App;
