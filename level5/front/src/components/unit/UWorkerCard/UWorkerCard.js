// @flow

/* eslint-disable */

import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './UWorkerCard.css';

type Props = {
  id: string,
  firstName: string,
  lastName: string,
  status: string,
  onRemove: Function,
  onEdit: Function,
  onSeeShifts: Function,
};

class UWorkerCard extends Component<Props> {

  render() {
    const { firstName, lastName, status, onSeeShifts, onEdit, onRemove, id } = this.props;
 
    return (
      <Card className="card">
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="285"
            image={`https://api.adorable.io/avatars/285/${firstName}.${lastName}@adorable.png`}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="h5">
              {`${firstName} ${lastName} (${status})`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => onSeeShifts(id)}
          >
            Shifts
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => onEdit(id)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => onRemove(id)}
          >
            Remove
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default UWorkerCard;
