import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function workspacesReducer(
  state = initialState.workspaces,
  action
) {
  switch (action.type) {
    case types.WEBEX_LOAD_WORKSPACES_SUCCESS:
      return action.workspaces;
    default:
      return state;
  }
}
