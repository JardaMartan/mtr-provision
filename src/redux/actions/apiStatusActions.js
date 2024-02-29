import * as types from "./actionTypes";

export function webexBeginApiCall() {
  return { type: types.WEBEX_BEGIN_API_CALL };
}

export function webexApiCallError() {
  return { type: types.WEBEX_API_CALL_ERROR };
}

export function o365BeginApiCall() {
  return { type: types.O365_BEGIN_API_CALL };
}

export function o365ApiCallError() {
  return { type: types.O365_API_CALL_ERROR };
}

export function deviceBeginApiCall() {
  return { type: types.DEVICE_BEGIN_API_CALL };
}

export function deviceApiCallError() {
  return { type: types.DEVICE_API_CALL_ERROR };
}

export function roomOSBeginApiCall() {
  return { type: types.ROOMOS_BEGIN_API_CALL };
}
