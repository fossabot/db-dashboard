const moatReducer = (state = { index: "", name: "" }, action) => {
  switch (action.type) {
    case "SET_MOAT":
      return {
        ...state,
        index: action.payload.index,
        name: action.payload.name,
      };
    default:
      return state;
  }
};
export default moatReducer;
