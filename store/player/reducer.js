import { ActionTypes } from './actions';

export default (state = false, action) => {
  switch (action.type) {
    case ActionTypes.SET_HAVE_PLAYER_INFO:
      return action.withData;
    default:
      return state;
  }
};
