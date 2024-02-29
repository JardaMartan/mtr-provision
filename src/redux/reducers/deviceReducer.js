import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function deviceReducer(state = initialState.device, action) {
  console.log(
    `deviceReducer: ${JSON.stringify(action)},\n state: ${JSON.stringify(
      state
    )} `
  );
  switch (action.type) {
    case types.DEVICE_LOGIN_SUCCESS:
      return { ...state, info: { ...state.info, ...action.info } };
    case types.DEVICE_LOGIN_FAILED:
      return { ...state, info: { ...state.info, ...action.info } };
    case types.DEVICE_CONNECTION_CONFIGURED:
      return { ...state, connectionConfigured: true };
    case types.SET_DEVICE_CONNECTION:
      return {
        ...state,
        connection: { ...state.connection, ...action.connection },
      };
    case types.WEBEX_ACTIVATION_CODE_SUCCESS:
      return { ...state, activationCode: { ...action.activationCode } };
    case types.WEBEX_ACTIVATION_CODE_FAILED:
      return { ...state, activationCode: { ...action.activationCode } };
    case types.WEBEX_GET_DEVICES_SUCCESS:
      return { ...state, info: { ...state.info, ...action.info } };
    case types.WEBEX_GET_DEVICES_FAILED:
      return { ...state, info: { ...state.info, webexInfo: {} } };
    case types.SWUPDATE_INFO_SUCCESS:
      return { ...state, swUpdateInfo: { ...action.swUpdateInfo } };
    case types.SWUPDATE_INFO_FAILED:
      return { ...state, swUpdateInfo: {} };
    case types.SET_SW_CHANNEL:
      return { ...state, swChannel: action.swChannel };
    default:
      return state;
  }
}
