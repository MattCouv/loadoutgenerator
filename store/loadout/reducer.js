import { combineReducers } from 'redux';
import { ActionTypes } from './actions';
import Generator from '../../Components/Generator';


const kit = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.GEN_KIT:
      Generator.randomKit();
      return Generator.kit;
    default:
      return state;
  }
};

const primary = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GEN_PRIMARY:
      Generator.randomPrimary();
      return Generator.loadout.slots.primary;
    default:
      return state;
  }
};

const secondary = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GEN_SECONDARY:
      Generator.randomSecondary();
      return Generator.loadout.slots.secondary;
    default:
      return state;
  }
};

const gadget1 = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GEN_GADGET1:
      Generator.randomGadget1();
      return Generator.loadout.slots.gadget1;
    default:
      return state;
  }
};

const gadget2 = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GEN_GADGET2:
      Generator.randomGadget2();
      return Generator.loadout.slots.gadget2;
    default:
      return state;
  }
};

const knife = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GEN_KNIFE:
      Generator.randomKnife();
      return Generator.loadout.slots.knife;
    default:
      return state;
  }
};
const grenade = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.GEN_GRENADE:
      Generator.randomGrenade();
      return Generator.loadout.slots.grenade;
    default:
      return state;
  }
};

const slots = combineReducers({
  primary,
  secondary,
  gadget1,
  gadget2,
  knife,
  grenade,
});

export default combineReducers({
  kit,
  slots,
});
