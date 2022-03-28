export const setPrivKey = (newKey) => {
  return {
    type: "SET_PRIVKEY",
    payload: newKey,
  };
};

export const setSecret = (newSecret) => {
  return {
    type: "SET_SECRET",
    payload: newSecret,
  };
};

export const setMoatName = (newMoat) => {
  return {
    type: "SET_MOATNAME",
    payload: newMoat,
  };
};

export const setMoat = (newIndex) => {
  return {
    type: "SET_MOAT",
    payload: newIndex,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
