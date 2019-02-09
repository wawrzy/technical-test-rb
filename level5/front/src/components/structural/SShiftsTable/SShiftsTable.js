// @flow


import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

type Props = {
  workers: Array<Object>,
  onDelete: Function,
};

class SShiftsTable extends Component<Props> {
  render() {
    const { workers } = this.props;

    return (
      <Table>
        <TableBody>
          {workers.map(this.renderRow)}
        </TableBody>
      </Table>
    );
  }

  renderRow = (worker: Object) => {
    const { onDelete } = this.props;

    return (
      <TableRow key={worker.id}>
        <TableCell>{`${worker.firstName} ${worker.lastName}`}</TableCell>
        <TableCell>{worker.status}</TableCell>
        <TableCell>
          <IconButton
            aria-label="Delete"
            onClick={() => onDelete(worker.id)}
          >
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

export default SShiftsTable;
