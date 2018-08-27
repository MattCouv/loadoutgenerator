import Router from 'next/router';
import redirect from '../../lib/redirect';
import { authenticate, signOut } from '../../lib/auth';
import { withPlayerData } from '../player/actions';


export const ActionType = {
  SET_LOGIN_PENDING: 'SET_LOGIN_PENDING',
  SET_LOGIN_SUCCESS: 'SET_LOGIN_SUCCESS',
  SET_LOGIN_ERROR: 'SET_LOGIN_ERROR',
};

const setLoginPending = isLoginPending => ({
  type: ActionType.SET_LOGIN_PENDING,
  isLoginPending,
});

const setLoginSuccess = isLoginSuccess => ({
  type: ActionType.SET_LOGIN_SUCCESS,
  isLoginSuccess,
});

const setLoginError = loginError => ({
  type: ActionType.SET_LOGIN_ERROR,
  loginError,
});

export const logout = () => (dispatch) => {
  dispatch(withPlayerData(false));
  signOut();
};

export const login = (name, plat) => (dispatch) => {
  dispatch(setLoginPending(true));
  dispatch(setLoginSuccess(false));
  dispatch(setLoginError(null));

  authenticate(name, plat).then((res) => {
    dispatch(setLoginPending(false));
    if (res.data.status === 'OK') {
      dispatch(setLoginSuccess(true));
      dispatch(withPlayerData(true));
      redirect('/');
    } else {
      dispatch(setLoginError(true));
    }
  }).catch((error) => {
    dispatch(setLoginPending(false));
    dispatch(setLoginError(true));
  });
};
