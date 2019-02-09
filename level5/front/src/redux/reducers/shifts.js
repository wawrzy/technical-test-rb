// @flow

import moment from 'moment';

import {
  ADD_WORKER_TO_SHIFTS,
  DEL_WORKER_TO_SHIFTS,
  DEL_WORKER_TO_SHIFT,
  NEXT_DAY,
  PREVIOUS_DAY,
} from 'Redux/actions/shifts/types';

type Shifts = {
  shifts: Array<Object>,
  currentDate: string,
};

const shiftsState = {
  shifts: [{ date: moment().format('MMMM DD YYYY'), workers: [] }],
  currentDate: moment().format('MMMM DD YYYY'),
};

export const shifts = (state: Shifts = shiftsState, action: any): Shifts => {
  const previousDay = moment(state.currentDate, 'MMMM DD YYYY').subtract(1, 'days').format('MMMM DD YYYY');
  const nextDay = moment(state.currentDate, 'MMMM DD YYYY').add(1, 'days').format('MMMM DD YYYY');

  switch (action.type) {
    case ADD_WORKER_TO_SHIFTS:
      return {
        ...state,
        shifts: state.shifts.map((shift) => {
          if (shift.date === state.currentDate) return { ...shift, workers: [...shift.workers, action.payload.workerId] };
          return shift;
        }),
      };
    case DEL_WORKER_TO_SHIFT:
      return {
        ...state,
        shifts: state.shifts.map((shift) => {
          if (shift.date === state.currentDate) return { ...shift, workers: shift.workers.filter(w => w !== action.payload.workerId) };
          return shift;
        }),
      };
    case DEL_WORKER_TO_SHIFTS:
      return {
        ...state,
        shifts: state.shifts.map(shift => ({ ...shift, workers: shift.workers.filter(w => w !== action.payload.workerId) })),
      };
    case NEXT_DAY:
      return {
        currentDate: nextDay,
        shifts: !state.shifts.find(({ date }) => date === nextDay)
          ? [...state.shifts, { date: nextDay, workers: [] }]
          : state.shifts,
      };
    case PREVIOUS_DAY:
      return {
        currentDate: previousDay,
        shifts: !state.shifts.find(({ date }) => date === previousDay)
          ? [...state.shifts, { date: previousDay, workers: [] }]
          : state.shifts,
      };
    default:
      return state;
  }
};
