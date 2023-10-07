import * as types from "./actionTypes";

export function o365LoginSuccess(o365) {
  return { type: types.O365_LOGIN_SUCCESS, o365 };
}

export function o365LoginFailed(o365) {
  return { type: types.O365_LOGIN_FAILED, o365 };
}

export function o365Login(o365) {
  return function (dispatch) {
    return dispatch(o365LoginSuccess(o365));
  };
}
