import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function webexReducer(state = initialState.webex, action) {
  switch (action.type) {
    case types.WEBEX_LOGIN_SUCCESS:
      return { ...state, ...action.webex };
    case types.WEBEX_LOGIN_FAILED:
      return { ...state, ...action.webex };
    default:
      return state;
  }
}
