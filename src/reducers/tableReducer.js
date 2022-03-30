const tableReducer = (state = { schema: "", table: "" }, action) => {
  switch (action.type) {
    case "SET_SCHEMA":
      return { ...state, schema: action.payload };
    case "SET_TABLE":
      return { ...state, table: action.payload };
    default:
      return state;
  }
};
export default tableReducer;
