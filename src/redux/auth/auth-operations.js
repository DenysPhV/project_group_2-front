import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
} from './auth-actions';

import { fetchSignUp, fetchLogin } from 'services/fetchApi'; // fetchCurrentUser

import axios from 'axios';

const BASE_URL = 'https://dvf-project-group-2-back.herokuapp.com/';

axios.defaults.baseURL = BASE_URL;

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = (credentials) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await fetchSignUp(credentials);
    dispatch(registerSuccess(response.data));
  } catch (response) {
    toast.error(
      response.response.status === 409 && '"Вы уже зарегистрированы"',
      {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
    );
    dispatch(registerError(response.message));
  }
};

const logIn = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await fetchLogin(credentials);
    token.set(response.data.token);
    dispatch(loginSuccess(response.data));
  } catch (response) {
    toast.error(
      response.response.status === 401 && 'Email or password is wrong!',
      {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
    );
    dispatch(loginError(response.message));
  }
};

// const token = {
//   set(token) {
//     fetchCurrentUser.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     fetchCurrentUser.common.Authorization = '';
//   },
// };

const getCurrentUser = () => (dispatch, getState) => {
  const {
    auth: { token: prsistedToken },
  } = getState();

  if (!prsistedToken) {
    return;
  }
  token.set(prsistedToken);

  dispatch(getCurrentUserRequest);

  axios
    .get('users/current')
    .then(({ data }) => dispatch(getCurrentUserSuccess(data)))
    .catch((err) => getCurrentUserError(err.message));
};

export const logout = () => async (dispatch) => {
  dispatch(logoutRequest());
  await axios.post('/users/logout');

  try {
    token.unset();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutError(error.message));
  }
};

export { register, logIn, getCurrentUser };
