import * as types from "./actionTypes";

export function updateDevicePreferencesSuccess(preferences) {
  return {
    type: types.DEVICE_PREFS_UPDATE_SUCCESS,
    preferences,
  };
}

export function updateDevicePreferences(preferences) {
  return function (dispatch) {
    return dispatch(updateDevicePreferencesSuccess(preferences));
  };
}
