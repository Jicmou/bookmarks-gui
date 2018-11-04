import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { HomePage, HomePageProps } from './home-page/home-page';
import {
  BookmarkPage,
  IBookmarkPageProps,
} from './bookmark-page/bookmark-page';

export type MainProps = HomePageProps & IBookmarkPageProps;

export const Main = (props: MainProps) => (
  <div className="main">
    <Router>
      <div className="routes">
        <Route
          path="/"
          exact={true}
          component={() => (
            <HomePage
              onBookmarkFormSubmit={props.onBookmarkFormSubmit}
              onChangePage={props.onChangePage}
              onChangeRowsPerPage={props.onChangeRowsPerPage}
              onDelete={props.onDelete}
              onEdit={props.onEdit}
              table={props.table}
            />
          )}
        />
        <Route
          path="/bookmark/:bookmarkId"
          component={() => (
            <BookmarkPage
              bookmark={props.bookmark}
              onBookmarkSave={props.onBookmarkSave}
              onTagFormSubmit={props.onTagFormSubmit}
              onTagRemove={props.onTagRemove}
            />
          )}
        />
      </div>
    </Router>
  </div>
);
