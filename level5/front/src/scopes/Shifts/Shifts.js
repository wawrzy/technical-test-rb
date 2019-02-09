// @flow

import React, { Component } from 'react';

import { connect } from 'react-redux';

import { SShiftsDashboard, SShiftsEditor } from 'Components/structural';
import {
  addWorkerToShift,
  delWorkerToShift,
  previousDay,
  nextDay,
} from 'Redux/actions/shifts/shifts';

import './Shifts.css';


type Props = {
  previousDay: Function,
  nextDay: Function,
  addWorkerToShift: Function,
  delWorkerToShift: Function,
  workers: Array<Object>,
  shifts: Array<Object>,
  currentDate: String
}

const mapStateToProps = state => ({
  workers: state.workers.workers,
  shifts: state.shifts.shifts,
  currentDate: state.shifts.currentDate,
});

const mapDispatchToProps = dispatch => ({
  previousDay: () => dispatch(previousDay()),
  nextDay: () => dispatch(nextDay()),
  addWorkerToShift: (workerId: string) => dispatch(addWorkerToShift(workerId)),
  delWorkerToShift: (workerId: string) => dispatch(delWorkerToShift(workerId)),
});

class Shifts extends Component<Props> {
  render() {
    return (
      <div id="Shifts">
        {this.renderDashboard()}
        {this.renderEditor()}
      </div>
    );
  }

  renderDashboard = () => {
    const {
      workers,
      shifts,
      currentDate,
      delWorkerToShift,
      previousDay,
      nextDay,
    } = this.props;

    const currentShift = shifts.find(({ date }) => date === currentDate);

    if (!currentShift) return null;

    const shiftWorkers = currentShift.workers.map(workerId => workers.find(({ id }) => id === workerId));

    return (
      <SShiftsDashboard
        workers={shiftWorkers}
        onDeleteWorker={delWorkerToShift}
        date={currentDate}
        onBack={previousDay}
        onForward={nextDay}
      />
    );
  }

  renderEditor = () => {
    const {
      addWorkerToShift,
      workers,
      shifts,
      currentDate,
    } = this.props;

    const currentShift = shifts.find(({ date }) => date === currentDate);

    if (!currentShift) return null;

    const workersNotInShift = workers.filter(({ id }) => currentShift.workers.findIndex(workerId => id === workerId) === -1);

    return (
      <SShiftsEditor
        workers={workersNotInShift}
        onAddWorkerToShift={addWorkerToShift}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shifts);
