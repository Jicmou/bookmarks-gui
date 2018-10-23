import * as React from 'react';
import './App.css';

import logo from './logo.svg';

import { Fetch } from './types/fetch.type';
import { Main } from './main';
import { TBookmarkList } from './bookmark-table/bookmark.type';
import { columnList, ColumnList } from './bookmark-table/columnList';
import { getBookmarkList } from './bookmark.service';

export interface IAppProps {
  fetch: Fetch;
}

export interface IAppState {
  apiUrl: string;
  bookmarkList: TBookmarkList;
  columnList: ColumnList;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      apiUrl: 'http://localhost:8000/',
      bookmarkList: [],
      columnList,
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
          />
        </div>
      </div>
    );
  }

  private retrieveBookmarkList() {
    return getBookmarkList(this.props.fetch)(this.state.apiUrl).then(
      bookmarkList => {
        this.setState({
          apiUrl: this.state.apiUrl,
          bookmarkList,
          columnList,
        });
      },
    );
  }
}

export default App;
