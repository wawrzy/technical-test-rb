// @flow


import React from 'react';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Typography from '@material-ui/core/Typography';

import { SShiftsTable } from 'Components/structural';

import './SShiftsDashboard.css';

type Props = {
  workers: Array<Object>,
  onDeleteWorker: Function,
  date: string,
  onBack: Function,
  onForward: Function,
};

const SShiftsDashboard = ({
  workers,
  onDeleteWorker,
  date,
  onBack,
  onForward,
}: Props) => (
  <Paper elevation={2} className="container">
    <Paper
      elevation={1}
      className="header"
    >
      <IconButton
        aria-label="Back"
        onClick={onBack}
      >
        <ArrowBack fontSize="large" />
      </IconButton>
      <Typography variant="h5">
        {date}
      </Typography>
      <IconButton
        aria-label="Forward"
        onClick={onForward}
      >
        <ArrowForward fontSize="large" />
      </IconButton>
    </Paper>
    <div className="table">
      <SShiftsTable
        workers={workers}
        onDelete={onDeleteWorker}
      />
    </div>
  </Paper>
);

export default SShiftsDashboard;
