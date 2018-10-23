import * as React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './bookmark-form.css';

// export type TOnChange = (event: React.ChangeEvent<Element>) => void;

// interface IBookmarkFormProps {
//   onChange: TOnChange;
// }

export class BookmarkForm extends React.Component {
  public render() {
    return (
      <div className="bookmark-form">
        <TextField
          id="outlined-name"
          label="Link"
          className="bookmark-form-input"
          margin="normal"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          className="bookmark-form-button"
        >
          Add
        </Button>
      </div>
    );
  }
}
