import { ADD_ACTION, DELETE_ACTION } from "../actionTypes/actionTypes";

const initialState = {
  actions: [{}],
};

export default actionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACTION:
      return {
        ...state,
      };

    case DELETE_ACTION:
      return {
        ...state,
      };
    default:
      return state;
  }
};
