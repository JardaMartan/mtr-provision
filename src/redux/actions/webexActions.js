import * as types from "./actionTypes";

export function webexLoginSuccess(webex) {
  return { type: types.WEBEX_LOGIN_SUCCESS, webex };
}

export function webexLoginFailed(webex) {
  return { type: types.WEBEX_LOGIN_FAILED, webex };
}

export function webexLogin(webex) {
  return function (dispatch) {
    return dispatch(webexLoginSuccess(webex));
  };
}
