import * as React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { IPreventEvent, IInputEvent } from '../App.type';

interface IBookmarkFormProps {
  inputValue: string;
  onInputChange: (event: IInputEvent) => void;
  onFormSubmit: (event: IPreventEvent) => void;
}

export class BookmarkForm extends React.Component<IBookmarkFormProps> {
  public render() {
    return (
      <form className="bookmark-form" onSubmit={this.props.onFormSubmit}>
        <TextField
          className="bookmark-form-input"
          id="outlined-name"
          label="Link"
          margin="normal"
          onChange={this.props.onInputChange}
          value={this.props.inputValue}
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
}
