export const initialState = {
  processes: {},
  processesStatus: 'idle',
  processesErrors: null
};

export const processes = (state = initialState) => (
  state.processes || initialState.processes
);
export const processesStatus = (state = initialState) => (
  state.processesStatus || initialState.processesStatus
);
export const processesErrors = (state = initialState) => (
  state.processesErrors || initialState.processesErrors
);
