import { combineReducers } from "redux";
import device from "./deviceReducer";
import webex from "./webexReducer";
import workspaces from "./workspacesReducer";
import o365 from "./o365Reducer";
import preferences from "./prefsReducer";
import apiCallsInProgress from "./apiStatusReducer";
import log from "./logReducer";

const rootReducer = combineReducers({
  device,
  webex,
  o365,
  preferences,
  workspaces,
  apiCallsInProgress,
  log,
});

export default rootReducer;
