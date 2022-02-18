import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  registerRequest,
  registerSuccess,
  registerError,
  // repeatEmailVerifyRequest,
  // repeatEmailVerifySuccess,
  // repeatEmailVerifyError,
  // logoutRequest,
  // logoutSuccess,
  loginRequest,
  loginSuccess,
  loginError,
  // getCurrentUserRequest,
  // getCurrentUserSuccess,
  // getCurrentUserError,
} from './auth-actions';

// import { setTotalBalanceSuccess } from 'redux/transactions';

import {
  // token,
  fetchSignUp,
  fetchLogin,
  // fetchLogout,
  // fetchAvatar,
  // fetchCurrent,
  // fetchRepeatVerify,
  // fetchRefreshToken,
} from 'services/fetchApi';

// const register = (credentials) => async (dispatch) => {
//   dispatch(registerRequest());
//   try {
//     const response = await fetchSignUp(credentials);
//     dispatch(registerSuccess(response.data));
//   } catch ({ response }) {
//     dispatch(registerError(response.data.message));
//
//   }
// };

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
      }

    );
    dispatch(registerError(response.message));
  }
}

// const repeatVerify = (email) => async (dispatch) => {
//   dispatch(repeatEmailVerifyRequest());
//   try {
//     const response = await fetchRepeatVerify(email);
//     dispatch(repeatEmailVerifySuccess(response.data));
//   } catch ({ response }) {
//     dispatch(repeatEmailVerifyError(response.data.message));
//
//   }
// };

const logIn = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await fetchLogin(credentials);
    // console.log(response);
    // token.set(response.token);
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

// const logOut = () => async (dispatch) => {
//   dispatch(logoutRequest());
//   try {
//     await fetchLogout();
//     token.unset();
//     dispatch(logoutSuccess());
//   } catch ({ response }) {
//     token.unset();
//     dispatch(logoutSuccess());
//   }
// };

// const uploadAvatar = (formData) => async (dispatch, getState) => {
//   dispatch(uploadAvatarRequest());
//   try {
//     const response = await fetchAvatar(formData);
//     dispatch(uploadAvatarSuccess(response.data.data));
//   } catch ({ response }) {
//     if (response.data.message === 'Unvalid token') {
//       await refresh(dispatch, getState);
//       const response = await fetchAvatar(formData);
//       dispatch(uploadAvatarSuccess(response.data.data));
//     } else {
//       dispatch(uploadAvatarError(response.data.message));

//     }
//   }
// };

// const getCurrentUser = () => async (dispatch, getState) => {
//   const {
//     auth: { token: persistedToken },
//   } = getState();

//   if (!persistedToken) {
//     return;
//   }
//   token.set(persistedToken);
//   dispatch(getCurrentUserRequest());
//   try {
//     const response = await fetchCurrent();
//     dispatch(getCurrentUserSuccess(response.data.user));
//     dispatch(setTotalBalanceSuccess(response.data.user.balance));
//   } catch ({ response }) {
//     if (response.data.message === 'Unvalid token') {
//       return await refresh(dispatch, getState);
//     }
//     dispatch(getCurrentUserError(response.data.message));

//   }
// };

// const refresh = async (dispatch, getState) => {
//   const {
//     auth: { refreshToken: persistedRefreshToken },
//   } = getState();
//   token.set(persistedRefreshToken);
//   try {
//     const response = await fetchRefreshToken();
//     token.set(response.data.data.token);
//     dispatch(getCurrentUserSuccess(response.data.data.user));
//     dispatch(setTotalBalanceSuccess(response.data.data.user.balance));
//     dispatch(
//       loginSuccess({
//         token: response.data.data.token,
//         refreshToken: response.data.data.refreshToken,
//       }),
//     );
//   } catch (error) {
//     dispatch(logoutSuccess());
//     token.unset();
//     console.log(error.message);
//   }
// };

export {
  register,
  // repeatVerify,
  // logOut,
  // getCurrentUser,
  // refresh,
  // uploadAvatar,
  logIn,
};
