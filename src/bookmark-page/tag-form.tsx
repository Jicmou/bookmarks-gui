import * as React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { IPreventEvent, ITargetValueEvent } from '../App.type';

export interface ITagFormProps {
  inputValue: string;
  onInputChange: (event: ITargetValueEvent) => void;
  onFormSubmit: (event: IPreventEvent) => void;
}

export const TagForm = (props: ITagFormProps) => (
  <form className="tag-form" onSubmit={props.onFormSubmit}>
    <TextField
      autoFocus={true}
      className="tag-form-input"
      id="outlined-name"
      label="Tag"
      margin="normal"
      onChange={props.onInputChange}
      value={props.inputValue}
      variant="outlined"
    />
    <Button
      className="tag-form-button"
      color="primary"
      type="submit"
      variant="contained"
    >
      Add
    </Button>
  </form>
);
