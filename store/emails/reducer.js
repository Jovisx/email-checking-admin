import { initialState } from './selectors';

import {
  GET_EMAILS_REQUEST,
  GET_EMAILS_SUCCESS,
  GET_EMAILS_FAILURE,
  MOVE_EMAIL_REQUEST,
  MOVE_EMAIL_SUCCESS,
  MOVE_EMAIL_FAILURE
} from './actions';

export default function (state = initialState, action = {}) {
  switch (action.type) {
    // Emails
    case GET_EMAILS_REQUEST:
      return {
        ...state,
        emailsStatus: 'running',
      };
    case GET_EMAILS_SUCCESS: {
      return {
        ...state,
        emails: action.payload,
        emailsStatus: 'success',
      };
    }
    case GET_EMAILS_FAILURE:
      return {
        ...state,
        emailsStatus: 'failure',
        emailsErrors: action.payload.errors,
      };
    case MOVE_EMAIL_REQUEST:
      return {
        ...state,
        moveStatus: 'running',
      };
    case MOVE_EMAIL_SUCCESS: {
      return {
        ...state,
        moveStatus: 'success',
      };
    }
    case MOVE_EMAIL_FAILURE:
      return {
        ...state,
        moveStatus: 'failure',
      };
    default:
      return state;
  }
}
