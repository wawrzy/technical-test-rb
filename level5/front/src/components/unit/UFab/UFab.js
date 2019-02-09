// @flow

import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

import './UFab.css';

type Props = {
  onClick: Function,
  color: string,
  label: string,
  icon: ?any
};

const UFab = ({
  onClick,
  icon,
  label,
  color,
}: Props) => (
  <Tooltip
    title={label}
    aria-label={label}
  >
    <Fab
      color={color}
      className="fab"
      onClick={onClick}
    >
      {icon}
    </Fab>
  </Tooltip>
);

export default UFab;
