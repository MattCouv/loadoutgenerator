import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import withPlayerInfo from './store/player/reducer';
import login from './store/login/reducer';
import loadout from './store/loadout/reducer';

const exampleInitialState = {
  withPlayerInfo: false,
  // loadout: {
  //   kit: this.kit,
  //   slots: {
  //     primary: {},
  //     secondary: {},
  //     gadget1: {},
  //     gadget2: {},
  //     grenade: {},
  //     knife: {},
  //   },
  // },
};

export const actionTypes = {
  TICK: 'TICK',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
};

// REDUCERS
export const reducer = combineReducers({
  withPlayerInfo,
  login,
  loadout,
});


export function initializeStore(initialState = exampleInitialState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}
