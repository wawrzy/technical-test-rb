import { combineReducers } from 'redux';

import { workers } from './workers';
import { shifts } from './shifts';

export default combineReducers({
  workers,
  shifts,
});
