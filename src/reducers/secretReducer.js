const secretReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_SECRET":
      return action.payload;
    default:
      return state;
  }
};
export default secretReducer;
