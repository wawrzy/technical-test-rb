// @flow

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import { UModal, URadioGroup } from 'Components/unit';


type Props = {
  firstName: string,
  lastName: string,
  status: string,
  modalOpen: boolean,
  onClose: Function,
  onConfirm: Function,
};

type State = {
  firstName: string,
  lastName: string,
  status: string,
};

const STATUS = ['interim', 'intern', 'medic'];

class SWorkerEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { firstName, lastName, status } = props;

    this.state = {
      firstName,
      lastName,
      status,
    };
  }

  render() {
    const { modalOpen, onClose } = this.props;

    return (
      <React.Fragment>
        <UModal
          open={modalOpen}
          onClose={onClose}
          onAction={this.handleConfirm}
          contentText="Edit worker"
          content={this.renderForm()}
          cancelContent="Cancel"
          actionContent="Confirm"
          title="Edit"
        />
      </React.Fragment>
    );
  }

  renderForm = () => {
    const { firstName, lastName, status } = this.state;

    return (
      <div className="form">
        <TextField
          id="first-name"
          label="Firstname"
          value={firstName}
          onChange={this.handleChange('firstName')}
          fullWidth
        />
        <TextField
          id="last-name"
          label="Lastname"
          value={lastName}
          onChange={this.handleChange('lastName')}
          fullWidth
        />
        <URadioGroup
          values={STATUS}
          defaultValue={status}
          onChange={this.handleChange('status')}
        />
      </div>
    );
  }

  handleChange = (name: string) => (event: any) => {
    this.setState({
      [name]: event.target ? event.target.value : event,
    });
  };

  handleConfirm = () => {
    const { onConfirm } = this.props;
    const { firstName, lastName, status } = this.state;

    onConfirm(firstName, lastName, status);
  }
}

export default SWorkerEditor;
