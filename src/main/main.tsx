import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { ERoutePath } from '../types/route-path.enum';

import { HomePage, HomePageProps } from './home-page/home-page';
import {
  RoutedBookmarkPage,
  IBookmarkPageProps,
} from './bookmark-page/bookmark-page';

export type MainProps = HomePageProps & IBookmarkPageProps;

export const Main = (props: MainProps) => (
  <div className="main">
    <Router>
      <div className="routes">
        <Route
          path={ERoutePath.HOME_PAGE}
          exact={true}
          component={() => (
            <HomePage
              onBookmarkFormSubmit={props.onBookmarkFormSubmit}
              onChangePage={props.onChangePage}
              onChangeRowsPerPage={props.onChangeRowsPerPage}
              onDelete={props.onDelete}
              table={props.table}
            />
          )}
        />
        <Route
          path={ERoutePath.BOOKMARK_PAGE}
          component={() => (
            <RoutedBookmarkPage
              addTagToBookmarkTagList={props.addTagToBookmarkTagList}
              onBookmarkSave={props.onBookmarkSave}
              removeTagFromBookmarkById={props.removeTagFromBookmarkById}
              retrieveCurrentBookmark={props.retrieveCurrentBookmark}
            />
          )}
        />
      </div>
    </Router>
  </div>
);
