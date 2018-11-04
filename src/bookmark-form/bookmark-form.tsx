import * as React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { IPreventEvent, ITargetValueEvent } from '../App.type';

export interface IBookmarkFormProps {
  onBookmarkFormSubmit: (link: string) => (event: IPreventEvent) => void;
}

interface IBookmarkState {
  inputValue: string;
}

export class BookmarkForm extends React.Component<
  IBookmarkFormProps,
  IBookmarkState
> {
  constructor(props: IBookmarkFormProps) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }
  public render() {
    return (
      <form
        className="bookmark-form"
        onSubmit={this.props.onBookmarkFormSubmit(this.state.inputValue)}
      >
        <TextField
          autoFocus={true}
          className="bookmark-form-input"
          id="outlined-name"
          label="Link"
          margin="normal"
          onChange={this.handleInputChange()}
          value={this.state.inputValue}
          variant="outlined"
        />
        <Button
          className="bookmark-form-button"
          color="primary"
          type="submit"
          variant="contained"
        >
          Add
        </Button>
      </form>
    );
  }

  private handleInputChange() {
    return (event: ITargetValueEvent) => {
      this.setState({
        inputValue: event.target.value,
      });
    };
  }
}
