import * as React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { IPreventEvent, ITargetValueEvent } from '../../App.type';

export interface IAppFormProps {
  buttonName: string;
  formId: string;
  inputLabel: string;
  onAppFormSubmit: (inputValue: string) => (event: IPreventEvent) => void;
}

interface IAppFormState {
  inputValue: string;
}

export class AppForm extends React.Component<IAppFormProps, IAppFormState> {
  constructor(props: IAppFormProps) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }
  public render() {
    return (
      <form
        className="app-form"
        id={this.props.formId}
        onSubmit={this.props.onAppFormSubmit(this.state.inputValue)}
      >
        <TextField
          className="app-form-input"
          id="outlined-name"
          label={this.props.inputLabel}
          margin="normal"
          onChange={this.handleInputChange()}
          value={this.state.inputValue}
          variant="outlined"
        />
        <Button
          className="app-form-button"
          color="primary"
          type="submit"
          variant="contained"
        >
          {this.props.buttonName}
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
