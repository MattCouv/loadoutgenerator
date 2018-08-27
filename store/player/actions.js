export const ActionTypes = {
  SET_HAVE_PLAYER_INFO: 'SET_HAVE_PLAYER_INFO',
};

export const withPlayerData = withData => ({
  type: ActionTypes.SET_HAVE_PLAYER_INFO,
  withData,
});
