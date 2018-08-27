import { ActionType } from './actions';

export default (state = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
}, action) => {
  switch (action.type) {
    case ActionType.SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending,
      });

    case ActionType.SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess,
      });

    case ActionType.SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError,
      });

    default:
      return state;
  }
};
