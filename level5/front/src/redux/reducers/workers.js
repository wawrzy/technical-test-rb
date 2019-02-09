// @flow

import {
  CREATE_WORKER,
  EDIT_WORKER,
  REMOVE_WORKER,
} from 'Redux/actions/workers/types';

type Workers = {
  workers: Array<Object>,
};

const workersState = {
  workers: [],
};

export const workers = (state: Workers = workersState, action: any): Workers => {
  switch (action.type) {
    case CREATE_WORKER:
      return {
        workers: [...state.workers, action.payload],
      };
    case EDIT_WORKER:
      return {
        workers: state.workers.map((worker) => {
          if (worker.id === action.payload.id) return action.payload;
          return worker;
        }),
      };
    case REMOVE_WORKER:
      return {
        workers: state.workers.filter(({ id }) => id !== action.payload.id),
      };
    default:
      return state;
  }
};
