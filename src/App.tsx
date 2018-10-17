import * as React from 'react';
import './App.css';

import logo from './logo.svg';

import { BookmarkList } from './bookmark-list/bookmark-list';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bookmark Manager</h1>
        </header>
        <div className="main">
          <BookmarkList />
        </div>
      </div>
    );
  }
}

export default App;
