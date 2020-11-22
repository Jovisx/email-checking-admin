import { createAction } from 'redux-actions';

export const GET_PROCESSES_REQUEST = '@processes/GET_PROCESSES_REQUEST';
export const GET_PROCESSES_SUCCESS = '@processes/GET_PROCESSES_SUCCESS';
export const GET_PROCESSES_FAILURE = '@processes/GET_PROCESSES_FAILURE';

export const processesActions = {
  // Get emails from process pool
  getProcessesRequest: createAction(GET_PROCESSES_REQUEST),
  getProcessesSuccess: createAction(GET_PROCESSES_SUCCESS),
  getProcessesFailure: createAction(GET_PROCESSES_FAILURE)
};
