import axios from 'axios';

export function getBaseURL() {
  const apiEndpoint = process.env.API_ENDPOINT;
  return apiEndpoint;
}

axios.defaults.withCredentials = false;
axios.defaults.baseURL = getBaseURL();
axios.defaults.timeout = 50000;
axios.defaults.method = 'GET';

function jsonConfig(config) {
  config.headers = {
    ...config.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return config;
}

function request(config) {
  if (config.data) {
    jsonConfig(config);
  }

  const tokenName = "accessToken";

  if (typeof localStorage !== 'undefined') {
    if (!config.headers) config.headers = {};
    if (localStorage.getItem(tokenName)) {
      const accessToken = localStorage.getItem(tokenName);
      config.headers = { Authorization: `Bearer ${accessToken}` };
    }
  }

  return axios.request(config);
}

export function loginUser({ userName, password }) {
  return request({
    url: '/auth/login',
    method: 'POST',
    data: { userName, password, status: 'active' },
  });
}

export function logoutUser() {
  return request({
    url: '/auth/logout',
    method: 'POST',
  });
}

// Admin get emails
export function getEmails(params) {
  return request({
    url: '/admin/list',
    params,
  });
}

// Admin move email to process pool
export function moveEmail({ emailId }) {
  return request({
    url: '/admin/move',
    method: 'POST',
    data: { emailId }
  });
}

// Admin get emails from process pool
export function getProcesses(params) {
  return request({
    url: '/admin/process-list',
    params,
  });
}
