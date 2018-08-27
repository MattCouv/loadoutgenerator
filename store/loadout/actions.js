
export const ActionTypes = {
  GEN_ALL_LOADOUT: 'GEN_ALL_LOADOUT',
  GEN_KIT: 'GEN_KIT',
  GEN_PRIMARY: 'GEN_PRIMARY',
  GEN_SECONDARY: 'GEN_SECONDARY',
  GEN_GADGET1: 'GEN_GADGET1',
  GEN_GADGET2: 'GEN_GADGET2',
  GEN_KNIFE: 'GEN_KNIFE',
  GEN_GRENADE: 'GEN_GRENADE',
};

export const genKit = () => ({
  type: ActionTypes.GEN_KIT,
});

export const genPrimary = () => ({
  type: ActionTypes.GEN_PRIMARY,
});

export const genSecondary = () => ({
  type: ActionTypes.GEN_SECONDARY,
});

export const genGadget1 = () => ({
  type: ActionTypes.GEN_GADGET1,
});

export const genGadget2 = () => ({
  type: ActionTypes.GEN_GADGET2,
});

export const genKnife = () => ({
  type: ActionTypes.GEN_KNIFE,
});

export const genGrenade = () => ({
  type: ActionTypes.GEN_GRENADE,
});

export const genAll = () => (dispatch) => {
  dispatch(genKit());
  dispatch(genPrimary());
  dispatch(genSecondary());
  dispatch(genGadget1());
  dispatch(genGadget2());
  dispatch(genKnife());
  dispatch(genGrenade());
};
