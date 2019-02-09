// @flow

import {
  ADD_WORKER_TO_SHIFTS,
  DEL_WORKER_TO_SHIFTS,
  DEL_WORKER_TO_SHIFT,
  NEXT_DAY,
  PREVIOUS_DAY,
} from './types';


export function addWorkerToShift(workerId: string) {
  return {
    type: ADD_WORKER_TO_SHIFTS,
    payload: {
      workerId,
    },
  };
}

export function delWorkerToShift(workerId: string) {
  return {
    type: DEL_WORKER_TO_SHIFT,
    payload: {
      workerId,
    },
  };
}

export function delWorkerToShifts(workerId: string) {
  return {
    type: DEL_WORKER_TO_SHIFTS,
    payload: {
      workerId,
    },
  };
}

export function previousDay() {
  return {
    type: PREVIOUS_DAY,
    payload: {},
  };
}

export function nextDay() {
  return {
    type: NEXT_DAY,
    payload: {},
  };
}
