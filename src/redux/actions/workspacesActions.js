import * as types from "./actionTypes";
import * as webexApi from "../../api/webexApi";
import { webexBeginApiCall } from "./apiStatusActions";
import { log } from "./logAction";

export function loadWorkspacesSuccess(workspaces) {
  return { type: types.WEBEX_LOAD_WORKSPACES_SUCCESS, workspaces };
}

export function loadWorkspaces(webex) {
  return function (dispatch) {
    dispatch(webexBeginApiCall());
    dispatch(
      log({
        source: "webex",
        level: "info",
        message: "Loading workspaces...",
      })
    );
    return webexApi
      .getWorkspaces(webex)
      .then((result) => {
        const logEntry = {
          source: "webex",
          level: "info",
          message: result.items.length + " workspaces loaded",
        };
        console.log(`prepared log entry: ${JSON.stringify(logEntry)}`);
        dispatch(log(logEntry));
        dispatch(loadWorkspacesSuccess(result.items));
      })
      .catch((error) => {
        console.error("Error loading workspaces: " + JSON.stringify(error));
        dispatch(
          log({
            source: "webex",
            message: "Error loading workspaces: " + JSON.stringify(error),
            level: "error",
          })
        );
      });
  };
}
