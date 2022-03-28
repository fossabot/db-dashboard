const privKeyReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_PRIVKEY":
      return action.payload;
    default:
      return state;
  }
};
export default privKeyReducer;
