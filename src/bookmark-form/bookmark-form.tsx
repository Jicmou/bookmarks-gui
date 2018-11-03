import * as React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { IPreventEvent, ITargetValueEvent } from '../App.type';

interface IBookmarkFormProps {
  inputValue: string;
  onInputChange: (event: ITargetValueEvent) => void;
  onFormSubmit: (event: IPreventEvent) => void;
}

export const BookmarkForm = (props: IBookmarkFormProps) => (
  <form className="bookmark-form" onSubmit={props.onFormSubmit}>
    <TextField
      autoFocus={true}
      className="bookmark-form-input"
      id="outlined-name"
      label="Link"
      margin="normal"
      onChange={props.onInputChange}
      value={props.inputValue}
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
