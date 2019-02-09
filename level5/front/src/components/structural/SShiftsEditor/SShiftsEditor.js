// @flow

import React, { Component } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';

import { UFab, UModal } from 'Components/unit';

type Props = {
  onAddWorkerToShift: Function,
  workers: Array<Object>,
};

type State = {
  modalOpen: boolean,
  workerId: string,
}

class SShiftsEditor extends Component<Props, State> {
  state = {
    modalOpen: false,
    workerId: '',
  };

  render() {
    const { modalOpen } = this.state;

    return (
      <React.Fragment>
        <UFab
          label="Edit shift"
          icon={<AddIcon />}
          color="secondary"
          onClick={this.handleShiftEdit}
        />
        <UModal
          open={modalOpen}
          onClose={this.handleClose}
          onAction={this.handleConfirm}
          contentText=""
          content={this.renderForm()}
          cancelContent="Cancel"
          actionContent="Confirm"
          title="Add worker to shift"
        />
      </React.Fragment>
    );
  }

  renderForm = () => {
    const { workers } = this.props;
    const { workerId } = this.state;

    const worker = workers.find(({ id }) => id === workerId);

    if (!worker && workerId !== '') return null;

    return (
      <div className="form">
        <FormControl variant="filled">
          <Select
            value={workerId}
            onChange={this.handleChange('workerId')}
            input={this.renderInput()}
            renderValue={() => worker && `${worker.firstName} ${worker.lastName}`}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.renderWorkers()}
          </Select>
        </FormControl>
      </div>
    );
  }

  renderInput = () => (
    <FilledInput name="workerId" value="kk" id="filled-age-simple" />
  );

  renderWorkers = (): Array<any> => {
    const { workers } = this.props;
    const { workerId } = this.state;

    return workers.filter(({ id }) => workerId !== id).map(worker => (
      <MenuItem key={worker.id} value={worker.id}>
        {`${worker.firstName} ${worker.lastName}`}
      </MenuItem>
    ));
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
    const { onAddWorkerToShift } = this.props;
    const { workerId } = this.state;

    this.setState({ modalOpen: false, workerId: '' }, () => {
      if (workerId !== '') onAddWorkerToShift(workerId);
    });
  }

  handleShiftEdit = () => {
    this.setState({ modalOpen: true });
  }
}

export default SShiftsEditor;
