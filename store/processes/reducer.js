import { initialState } from './selectors';

import {
  GET_PROCESSES_REQUEST,
  GET_PROCESSES_SUCCESS,
  GET_PROCESSES_FAILURE,
} from './actions';

export default function (state = initialState, action = {}) {
  switch (action.type) {
    // Processes
    case GET_PROCESSES_REQUEST:
      return {
        ...state,
        processesStatus: 'running',
      };
    case GET_PROCESSES_SUCCESS: {
      return {
        ...state,
        processes: action.payload,
        processesStatus: 'success',
      };
    }
    case GET_PROCESSES_FAILURE:
      return {
        ...state,
        processesStatus: 'failure',
        processesErrors: action.payload.errors,
      };
    default:
      return state;
  }
}
