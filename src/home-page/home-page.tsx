import * as React from 'react';

import { BookmarkForm } from '../bookmark-form/bookmark-form';
import { BookmarkTable } from '../bookmark-table/bookmark-table';

import { IPreventEvent, ITargetValueEvent, ITableState } from '../App.type';

interface IHomePageProps {
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
  onChangeRowsPerPage: (event: ITargetValueEvent) => void;
  onFormSubmit: (link: string) => (event: IPreventEvent) => void;
  onDelete: (bookmarkId: number) => () => void;
  onEdit: (bookmarkId: number) => () => void;
  table: ITableState;
}

interface IHomePageState {
  bookmarkForm: {
    inputValue: string;
  };
}

export class HomePage extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = {
      bookmarkForm: {
        inputValue: '',
      },
    };
  }

  public render() {
    return (
      <div className="home-page-body">
        <BookmarkForm
          inputValue={this.state.bookmarkForm.inputValue}
          onFormSubmit={this.props.onFormSubmit(
            this.state.bookmarkForm.inputValue,
          )}
          onInputChange={this.handleInputChange()}
        />
        <BookmarkTable
          onDelete={this.props.onDelete}
          onEdit={this.props.onEdit}
          onChangePage={this.props.onChangePage}
          onChangeRowsPerPage={this.props.onChangeRowsPerPage}
          table={this.props.table}
        />
      </div>
    );
  }

  private handleInputChange() {
    return (event: ITargetValueEvent) => {
      this.setState({
        bookmarkForm: {
          inputValue: event.target.value,
        },
      });
    };
  }
}
