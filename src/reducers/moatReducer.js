const moatReducer = (state = { name: null, index: "" }, action) => {
  switch (action.type) {
    case "SET_MOATNAME":
      return { ...state, name: action.payload };
    case "SET_MOAT":
      return { ...state, index: action.payload };
    default:
      return state;
  }
};
export default moatReducer;
