// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createWorker, editWorker, removeWorker } from 'Redux/actions/workers/workers';
import { delWorkerToShifts } from 'Redux/actions/shifts/shifts';
import {
  SWorkerCreator,
  SWorkerEditor,
  SWorkerCards,
  SSeeShifts,
} from 'Components/structural';


const mapStateToProps = state => ({
  workers: state.workers.workers,
  shifts: state.shifts.shifts,
});

const mapDispatchToProps = dispatch => ({
  createWorker: (id, firstName, lastName, status) => dispatch(createWorker(id, firstName, lastName, status)),
  removeWorker: id => dispatch(removeWorker(id)),
  removeWorkerFromShifts: id => dispatch(delWorkerToShifts(id)),
  editWorker: (id, firstName, lastName, status) => dispatch(editWorker(id, firstName, lastName, status)),
});

type Props = {
  workers: Array<Object>,
  shifts: Array<Object>,
  createWorker: Function,
  removeWorker: Function,
  editWorker: Function,
  removeWorkerFromShifts: Function,
}

type State = {
  modalEditOpen: boolean,
  idWorkerToEdit: string,
  dates: Array<string>,
  modalShiftsOpen: boolean,
}

class Workers extends Component<Props, State> {
  state = {
    modalEditOpen: false,
    modalShiftsOpen: false,
    dates: [],
    idWorkerToEdit: '',
  };

  render() {
    const { workers } = this.props;

    return (
      <div>
        <SWorkerCards
          workers={workers}
          onEdit={this.handleEdit}
          onRemove={this.handleRemove}
          onSeeShifts={this.handleSeeShifts}
        />
        { this.renderWorkerEditor() }
        { this.renderSeeShifts() }
        <SWorkerCreator onCreate={this.handleCreate} />
      </div>
    );
  }

  renderSeeShifts = () => {
    const { dates, modalShiftsOpen } = this.state;

    return (
      <SSeeShifts
        modalOpen={modalShiftsOpen}
        dates={dates}
        onClose={this.handleCloseSeeShifts}
      />
    );
  }

  renderWorkerEditor = () => {
    const { workers } = this.props;
    const { idWorkerToEdit, modalEditOpen } = this.state;

    const worker = workers.find(({ id }) => id === idWorkerToEdit);

    if (!worker) return null;

    return (
      <SWorkerEditor
        firstName={worker.firstName}
        lastName={worker.lastName}
        status={worker.status}
        modalOpen={modalEditOpen}
        onClose={this.handleCloseEdit}
        onConfirm={this.handleConfirmEdit}
      />
    );
  }

  handleSeeShifts = (id: string) => {
    const { shifts } = this.props;

    const dates = shifts.filter(({ workers }) => workers.indexOf(id) !== -1).map(({ date }) => date);

    this.setState({ modalShiftsOpen: true, dates });
  }

  handleCloseSeeShifts = () => {
    this.setState({ dates: [], modalShiftsOpen: false });
  }

  handleEdit = (id: string) => {
    this.setState({ modalEditOpen: true, idWorkerToEdit: id });
  }

  handleConfirmEdit = (firstName: string, lastName: string, status: string) => {
    const { editWorker } = this.props;
    const { idWorkerToEdit } = this.state;

    this.setState({ modalEditOpen: false, idWorkerToEdit: '' }, () => {
      editWorker(idWorkerToEdit, firstName, lastName, status);
    });
  }

  handleCloseEdit = () => {
    this.setState({ modalEditOpen: false, idWorkerToEdit: '' });
  }

  handleRemove = (id: string) => {
    const { removeWorker, removeWorkerFromShifts } = this.props;

    removeWorker(id);
    removeWorkerFromShifts(id);
  }

  handleCreate = (lastName: string, firstName: string, status: string) => {
    const { createWorker } = this.props;
    const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);

    createWorker(id, lastName, firstName, status);
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Workers);
