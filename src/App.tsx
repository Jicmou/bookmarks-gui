import * as React from 'react';
import './App.css';

import Modal from '@material-ui/core/Modal';
// import Popover from '@material-ui/core/Popover';
import logo from './logo.svg';

import { Fetch } from './types/fetch.type';
import { Main } from './main';
import { TBookmarkList } from './bookmark-table/bookmark.type';
import { columnList, ColumnList } from './bookmark-table/columnList';
import {
  getBookmarkList,
  createBookmark,
  deleteBookmark,
  IServerErrorMessage,
  removeBookmarkFromList,
} from './bookmark.service';

export interface IAppProps {
  fetch: Fetch;
}

interface IModalState {
  message: string;
  open: boolean;
}

export interface IAppState {
  apiUrl: string;
  bookmarkList: TBookmarkList;
  columnList: ColumnList;
  inputValue: string;
  modal: IModalState;
}

export interface IInputEvent {
  target: { value: string };
}

export interface IPreventEvent {
  preventDefault: () => void;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      apiUrl: 'http://localhost:8000',
      bookmarkList: [],
      columnList,
      inputValue: '',
      modal: {
        message: '',
        open: false,
      },
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
            columnList={this.state.columnList}
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

  private handleFormSubmit(state: IAppState) {
    return (event: Event) => {
      event.preventDefault();
      this.createBookmark(event)(state.inputValue);
    };
  }

  private handleInputChange() {
    return (event: IInputEvent) => {
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
      createBookmark(this.props.fetch)(this.state.apiUrl)(link)
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
    return deleteBookmark(this.props.fetch)(this.state.apiUrl)(bookmarkId).then(
      () => {
        this.setState({
          bookmarkList: removeBookmarkFromList(this.state.bookmarkList)(
            bookmarkId,
          ),
        });
      },
    );
  }

  private retrieveBookmarkList() {
    return getBookmarkList(this.props.fetch)(this.state.apiUrl).then(
      bookmarkList => {
        this.setState({
          bookmarkList,
        });
      },
    );
  }
}

export default App;
