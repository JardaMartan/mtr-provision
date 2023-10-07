import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function prefsReducer(state = initialState.preferences, action) {
  // console.log(
  //   `prefsReducer: action: ${JSON.stringify(action)},\n state: ${JSON.stringify(
  //     state
  //   )} `
  // );
  switch (action.type) {
    case types.DEVICE_PREFS_UPDATE_SUCCESS:
      return { ...state, ...action.preferences };
    default:
      return state;
  }
}
