import { all, put, call, takeLatest } from 'redux-saga/effects';
import * as api from 'utils/api';
import extractErrors from 'utils/error';

import {
  GET_EMAILS_REQUEST,
  MOVE_EMAIL_REQUEST,
  emailsActions,
} from './actions';

export function* getEmails({ payload }) {
  try {
    const response = yield call(api.getEmails, payload);
    yield put(emailsActions.getEmailsSuccess(response.data));
  } catch (err) {
    const errors = extractErrors(err);
    yield put(emailsActions.getEmailsFailure({ errors }));
  }
}

export function* moveEmail({ payload }) {
  try {
    const response = yield call(api.moveEmail, payload);
    yield put(emailsActions.moveEmailsSuccess(response.data));
  } catch (err) {
    const errors = extractErrors(err);
    yield put(emailsActions.moveEmailFailure({ errors }));
  }
}

export default function* () {
  yield all([
    takeLatest(GET_EMAILS_REQUEST, getEmails),
    takeLatest(MOVE_EMAIL_REQUEST, moveEmail)
  ]);
}
