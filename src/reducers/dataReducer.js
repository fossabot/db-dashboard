const dataReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        schema: action.payload.schema,
        table: action.payload.table,
      };
    default:
      return state;
  }
};
export default dataReducer;
