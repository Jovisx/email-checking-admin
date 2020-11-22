import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as api from 'utils/api';
import extractErrors from 'utils/error';

import {
  GET_PROCESSES_REQUEST,
  processesActions,
} from './actions';

export function* getProcesses({ payload }) {
  try {
    const response = yield call(api.getProcesses, payload);
    yield put(processesActions.getProcessesSuccess(response.data));
  } catch (err) {
    const errors = extractErrors(err);
    yield put(processesActions.getProcessesFailure({ errors }));
  }
}

export default function* () {
  yield all([
    takeLatest(GET_PROCESSES_REQUEST, getProcesses)
  ]);
}
