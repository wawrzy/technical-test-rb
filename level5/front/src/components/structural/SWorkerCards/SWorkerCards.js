// @flow


import React from 'react';

import { UWorkerCard } from 'Components/unit';

import './SWorkerCards.css';

type Worker = {
  firstName: string,
  lastName: string,
  status: string,
  id: string,
};

type Props = {
  workers: Array<Worker>,
  onEdit: Function,
  onRemove: Function,
  onSeeShifts: Function,
};

const SWorkerCards = ({
  workers,
  onEdit,
  onSeeShifts,
  onRemove,
}: Props) => (
  <div id="SWorkerCards">
    {workers.map(({
      id,
      firstName,
      lastName,
      status,
    }) => (
      <UWorkerCard
        key={id}
        id={id}
        firstName={firstName}
        lastName={lastName}
        status={status}
        onEdit={onEdit}
        onRemove={onRemove}
        onSeeShifts={onSeeShifts}
      />
    ))}
  </div>
);

export default SWorkerCards;
