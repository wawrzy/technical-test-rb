// @flow

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';

import { UFab, UModal, URadioGroup } from 'Components/unit';

import './SWorkerCreator.css';

type Props = {
  onCreate: Function,
};

type State = {
  modalOpen: boolean,
  firstName: string,
  lastName: string,
  status: 'interim' | 'intern' | 'medic',
};

const STATUS = ['interim', 'intern', 'medic'];

class SWorkerCreator extends Component<Props, State> {
  state = {
    modalOpen: false,
    firstName: '',
    lastName: '',
    status: STATUS[0],
  };

  render() {
    const { modalOpen } = this.state;

    return (
      <React.Fragment>
        <UFab
          label="Add worker"
          icon={<AddIcon />}
          color="secondary"
          onClick={this.handleAddWorker}
        />
        <UModal
          open={modalOpen}
          onClose={this.handleClose}
          onAction={this.handleConfirm}
          contentText="Create new worker"
          content={this.renderForm()}
          cancelContent="Cancel"
          actionContent="Confirm"
          title="Worker creator"
        />
      </React.Fragment>
    );
  }

  renderForm = () => {
    const { firstName, lastName } = this.state;

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

  handleClose = () => {
    this.setState({ modalOpen: false });
  }

  handleConfirm = () => {
    const { onCreate } = this.props;
    const { lastName, firstName, status } = this.state;

    this.setState({
      modalOpen: false,
      lastName: '',
      firstName: '',
      status: STATUS[0],
    }, () => {
      onCreate(lastName, firstName, status);
    });
  }

  handleAddWorker = () => {
    this.setState({ modalOpen: true });
  }
}

export default SWorkerCreator;
