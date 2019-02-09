// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import GroupWork from '@material-ui/icons/GroupWork';
import Timeline from '@material-ui/icons/Timeline';

import './SAppBar.css';

type Props = {
  history: Object,
};

class SAppBar extends Component<Props> {
  render() {
    return (
      <AppBar position="static">
        <Toolbar className="content-container">
          <Typography
            variant="h6"
            color="inherit"
          >
            Manager
          </Typography>
          <div>
            <Tooltip
              title="Workers"
              aria-label="Workers"
            >
              <IconButton
                onClick={this.handleWorkersClick}
                color="inherit"
              >
                <GroupWork />
              </IconButton>
            </Tooltip>
            <Tooltip
              title="Shifts"
              aria-label="Shifts"
            >
              <IconButton
                onClick={this.handleShiftsClick}
                color="inherit"
              >
                <Timeline />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    );
  }

  handleWorkersClick = () => {
    const { history } = this.props;

    history.push('/workers');
  }

  handleShiftsClick = () => {
    const { history } = this.props;

    history.push('/shifts');
  }
}

export default withRouter(SAppBar);
