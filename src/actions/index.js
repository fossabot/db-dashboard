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

export const setData = (schema, table) => {
  return {
    type: "SET_DATA",
    payload: {
      schema,
      table,
    },
  };
};
