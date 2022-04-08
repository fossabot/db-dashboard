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

export const setMoat = (index, name) => {
  return {
    type: "SET_MOAT",
    payload: {
      index,
      name,
    },
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const setTable = (schema, table) => {
  return {
    type: "SET_TABLE",
    payload: {
      schema,
      table,
    },
  };
};

export const addPool = (pool) => {
  return {
    type: "ADD_POOL",
    payload: pool,
  };
};

export const removePool = (pool) => {
  return {
    type: "REMOVE_POOL",
    payload: pool,
  };
};

export const setMoats = (moats) => {
  return {
    type: "SET_MOATS",
    payload: moats,
  };
};
