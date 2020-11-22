import { createAction } from 'redux-actions';

export const GET_EMAILS_REQUEST = '@emails/GET_EMAILS_REQUEST';
export const GET_EMAILS_SUCCESS = '@emails/GET_EMAILS_SUCCESS';
export const GET_EMAILS_FAILURE = '@emails/GET_EMAILS_FAILURE';
export const MOVE_EMAIL_REQUEST = '@emails/MOVE_EMAIL_REQUEST';
export const MOVE_EMAIL_SUCCESS = '@emails/MOVE_EMAIL_SUCCESS';
export const MOVE_EMAIL_FAILURE = '@emails/MOVE_EMAIL_FAILURE';

export const emailsActions = {
  // Get Emails
  getEmailsRequest: createAction(GET_EMAILS_REQUEST),
  getEmailsSuccess: createAction(GET_EMAILS_SUCCESS),
  getEmailsFailure: createAction(GET_EMAILS_FAILURE),
  moveEmailRequest: createAction(MOVE_EMAIL_REQUEST),
  moveEmailSuccess: createAction(MOVE_EMAIL_SUCCESS),
  moveEmailFailure: createAction(MOVE_EMAIL_FAILURE)
};
