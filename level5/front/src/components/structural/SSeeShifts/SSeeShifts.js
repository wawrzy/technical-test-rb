// @flow

import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import { UModal } from 'Components/unit';


type Props = {
  onClose: Function,
  dates: Array<string>,
  modalOpen: boolean,
};

class SSeeShifts extends Component<Props> {
  render() {
    const { modalOpen, onClose, dates } = this.props;

    return (
      <React.Fragment>
        <UModal
          open={modalOpen}
          onClose={onClose}
          onAction={onClose}
          contentText=""
          content={dates.map(this.renderDate)}
          cancelContent="Close"
          actionContent=""
          title="Shifts"
        />
      </React.Fragment>
    );
  }

  renderDate = (date: string) => (
    <Typography variant="h6" key={date}>
      {date}
    </Typography>
  );
}

export default SSeeShifts;
