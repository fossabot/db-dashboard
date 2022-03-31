const dataReducer = (state = { schema: "", table: "", pools: [] }, action) => {
  switch (action.type) {
    case "SET_TABLE":
      return {
        ...state,
        schema: action.payload.schema,
        table: action.payload.table,
        pools: [],
      };
    case "ADD_POOL":
      return {
        ...state,
        schema: "",
        table: "",
        pools: [...state.pools, action.payload],
      };
    case "REMOVE_POOL":
      return {
        ...state,
        pools: state.pools.filter((pool) => pool !== action.payload),
      };
    default:
      return state;
  }
};
export default dataReducer;
