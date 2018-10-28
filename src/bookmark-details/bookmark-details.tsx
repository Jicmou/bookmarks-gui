import * as React from 'react';

export interface IBookmarkDetailsProps {
  match: {
    params: {
      bookmarkId: string;
    };
  };
}

export const BookmarkDetails = (props: IBookmarkDetailsProps) => (
  <h1>Hello, Bookmark {props.match.params.bookmarkId}!</h1>
);
