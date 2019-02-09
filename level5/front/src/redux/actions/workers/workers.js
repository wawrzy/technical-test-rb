// @flow

import { CREATE_WORKER, EDIT_WORKER, REMOVE_WORKER } from './types';


export function createWorker(id: string, firstName: string, lastName: string, status: string) {
  return {
    type: CREATE_WORKER,
    payload: {
      firstName,
      lastName,
      status,
      id,
    },
  };
}

export function editWorker(id: string, firstName: string, lastName: string, status: string) {
  return {
    type: EDIT_WORKER,
    payload: {
      firstName,
      lastName,
      status,
      id,
    },
  };
}

export function removeWorker(id: string) {
  return {
    type: REMOVE_WORKER,
    payload: {
      id,
    },
  };
}
