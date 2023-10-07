import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function logReducer(state = initialState.log, action) {
  /*console.log(
    `logReducer, action: ${JSON.stringify(action)},\n state: ${JSON.stringify(
      state
    )}`
  );*/
  switch (action.type) {
    case types.LOG_ADD:
      return [...state, action.log];
    default:
      return state;
  }
}
