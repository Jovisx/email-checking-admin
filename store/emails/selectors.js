export const initialState = {
  emails: {},
  emailsStatus: 'idle',
  emailsErrors: null,
  moveStatus: 'idle'
};

export const emails = (state = initialState) => (
  state.emails || initialState.emails
);
export const emailsStatus = (state = initialState) => (
  state.emailsStatus || initialState.emailsStatus
);
export const emailsErrors = (state = initialState) => (
  state.emailsErrors || initialState.emailsErrors
);
export const moveStatus = (state = initialState) => (
  state.moveStatus || initialState.moveStatus
);
