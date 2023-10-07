import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function o365Reducer(state = initialState.o365, action) {
  switch (action.type) {
    case types.O365_LOGIN_SUCCESS:
      return { ...state, ...action.o365 };
    case types.O365_LOGIN_FAILED:
      return { ...state, ...action.o365 };
    default:
      return state;
  }
}
