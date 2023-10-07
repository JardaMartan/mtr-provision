import * as types from "./actionTypes";
import * as deviceApi from "../../api/deviceApi";
import * as webexApi from "../../api/webexApi";
import { deviceBeginApiCall, webexBeginApiCall } from "./apiStatusActions";
import { log } from "./logAction";
import { loadWorkspaces } from "./workspacesActions";

export function deviceLoginSuccess(info) {
  return { type: types.DEVICE_LOGIN_SUCCESS, info };
}

export function deviceLoginFailed(info) {
  console.log(`deviceLoginFailed: ${JSON.stringify(info)}`);
  return { type: types.DEVICE_LOGIN_FAILED, info };
}

export function deviceConnectionConfigured() {
  return { type: types.DEVICE_CONNECTION_CONFIGURED };
}

export function deviceConnectionSuccess(connection) {
  return { type: types.SET_DEVICE_CONNECTION, connection };
}

export function deployDevicePrefsSuccess(device, preferences) {
  return { type: types.DEVICE_DEPLOY_PREFS_FAILED, device, preferences };
}

export function createActivationCodeSuccess(activationCode) {
  return { type: types.WEBEX_ACTIVATION_CODE_SUCCESS, activationCode };
}

export function deployActivationCodeSuccess(device, activationCode) {
  return { type: types.DEVICE_DEPLOY_ACTIVATION_CODE_SUCCESS, activationCode };
}

export function deviceLogin(device) {
  //eslint-disable-next-line no-unused-vars
  return async function (dispatch, getState) {
    dispatch(deviceConnectionConfigured());
    dispatch(getDeviceInfo(device, true));
  };
}

export function getDeviceInfo(device, dispatchLog) {
  //eslint-disable-next-line no-unused-vars
  return async function (dispatch, getState) {
    dispatch(deviceBeginApiCall());
    if (dispatchLog) {
      dispatch(
        log({
          source: "device",
          level: "info",
          message: `Connecting to device ${device.connection.ipAddress}...`,
        })
      );
    }
    return deviceApi
      .getDeviceInfo(device.connection)
      .then((deviceStatus) => {
        // debugger;
        // const prevState = getState(); //eslint-disable-line no-unused-vars
        const info = {
          serialNumber: deviceStatus.Hardware.Module.SerialNumber,
          model: deviceStatus.ProductId,
          status: "connected",
          statusDescription: "Connected",
        };
        if (dispatchLog) {
          dispatch(
            log({
              source: "device",
              level: "info",
              message: `Device connection OK, ${info.model}, SN: ${info.serialNumber}`,
            })
          );
        }
        dispatch(deviceLoginSuccess(info));
      })
      .catch((error) => {
        const info = {
          status: "error",
          statusDescription: `Device connection error.`,
        };
        // console.log(`deviceLogin error: ${JSON.stringify(error)}`);
        if (dispatchLog) {
          dispatch(
            log({
              source: "device",
              level: "error",
              message: `Device connection error: ${JSON.stringify(error)}`,
            })
          );
        }
        dispatch(deviceLoginFailed(info));
      });
  };
}

export function deviceConnection(connection) {
  return function (dispatch) {
    return dispatch(deviceConnectionSuccess(connection));
  };
}

export function deployDevicePrefs(device, preferences) {
  //eslint-disable-next-line no-unused-vars
  return async function (dispatch, getState) {
    dispatch(deviceBeginApiCall());
    dispatch(
      log({
        source: "device",
        level: "info",
        message: `Deploy preferences ${JSON.stringify(preferences)} to device ${
          device.connection.ipAddress
        }...`,
      })
    );
    try {
      const configResult = await deviceApi.setDeviceConfig({
        ...device.connection,
        preferences,
      });
      dispatch(
        log({
          source: "device",
          level: "info",
          message: `Preferences deployed: ${JSON.stringify(configResult)}`,
        })
      );
      dispatch(deployDevicePrefsSuccess(device, preferences));
    } catch (error) {
      console.error(error);
      dispatch(
        log({
          source: "device",
          level: "error",
          message: "Preferences failed to deploy: " + JSON.stringify(error),
        })
      );
    }
    try {
      const dateTimePrefs = {
        timeZone: preferences.timeZone,
        dateFormat: preferences.dateFormat,
        timeFormat: preferences.timeFormat,
      };
      console.log(
        `set time zone, date and time format ${JSON.stringify(dateTimePrefs)}`
      );
      const dateTimePrefsResult = await deviceApi.setDateTimePrefs({
        ...device.connection,
        preferences,
      });
      dispatch(
        log({
          source: "device",
          level: "info",
          message: `Date time preferences set:  ${JSON.stringify(
            dateTimePrefsResult
          )})}`,
        })
      );
      dispatch(setDateTimePrefsSuccess());
    } catch (error) {
      console.error(error);
      dispatch(
        log({
          source: "device",
          level: "error",
          message:
            "Date time preferences failed to set: " + JSON.stringify(error),
        })
      );
    }
    try {
      console.log(`set language to ${preferences.language}`);
      const langPrefsResult = await deviceApi.setLanguage({
        ...device.connection,
        language: preferences.language,
      });
      dispatch(
        log({
          source: "device",
          level: "info",
          message: `Language set:  ${JSON.stringify(langPrefsResult)})}`,
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        log({
          source: "device",
          level: "error",
          message: "Language failed to set: " + JSON.stringify(error),
        })
      );
    }
  };
}

export function createActivationCode(webex, workspace) {
  //eslint-disable-next-line no-unused-vars
  return async function (dispatch, getState) {
    dispatch(webexBeginApiCall());
    dispatch(
      log({
        source: "webex",
        level: "info",
        message: `Create activation code for workspace ${workspace.displayName}...`,
      })
    );
    return webexApi
      .createActivationCode(webex, workspace.id)
      .then((activationCode) => {
        dispatch(
          log({
            source: "webex",
            level: "info",
            message:
              "Activation code created: " + JSON.stringify(activationCode),
          })
        );

        activationCode.workspace = workspace;

        dispatch(createActivationCodeSuccess(activationCode));
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          log({
            source: "webex",
            level: "error",
            message:
              "Activation code creation failed: " + JSON.stringify(error),
          })
        );
      });
  };
}

export function deployActivationCode(device, activationCode) {
  //eslint-disable-next-line no-unused-vars
  return async function (dispatch, getState) {
    dispatch(deviceBeginApiCall());
    dispatch(
      log({
        source: "device",
        level: "info",
        message: `Deploy activation code to ${device.connection.ipAddress}...`,
      })
    );
    return deviceApi
      .registerDeviceToWebex({ ...device.connection, activationCode })
      .then(() => {
        dispatch(
          log({
            source: "device",
            level: "info",
            message: "Activation code deployed",
          })
        );
        dispatch(deployActivationCodeSuccess(device, activationCode));
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          log({
            source: "device",
            level: "error",
            message:
              "Activation code failed to deploy: " + JSON.stringify(error),
          })
        );
      });
  };
}

export function closeFirstTimeWizardSuccess() {
  return { type: types.DEVICE_CLOSE_FIRST_TIME_WIZARD_SUCCESS };
}

export function closeFirstTimeWizardFailed() {
  return { type: types.DEVICE_CLOSE_FIRST_TIME_WIZARD_FAILED };
}

export function closeFirstTimeWizard(device) {
  //eslint-disable-next-line no-unused-vars
  return async function (dispatch, getState) {
    dispatch(deviceBeginApiCall());
    dispatch(
      log({
        source: "device",
        level: "info",
        message: `Close first time wizard on ${device.connection.ipAddress}...`,
      })
    );

    return deviceApi
      .closeFirstTimeWizard({ ...device.connection })
      .then(() => {
        dispatch(
          log({
            source: "device",
            level: "info",
            message: "First time wizard closed",
          })
        );
        dispatch(closeFirstTimeWizardSuccess());
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          log({
            source: "device",
            level: "error",
            message:
              "First time wizard failed to close: " + JSON.stringify(error),
          })
        );
      });
  };
}

export function setDateTimePrefsSuccess() {
  return { type: types.DEVICE_SET_DATE_TIME_PREFS_SUCCESS };
}

export function setDateTimePrefsFailed() {
  return { type: types.DEVICE_SET_DATE_TIME_PREFS_FAILED };
}

export function setDateTimePrefs(device, preferences) {
  //eslint-disable-next-line no-unused-vars
  return async function (dispatch, getState) {
    console.log(
      `setDateTimePrefs: ${JSON.stringify({
        ...device.connection,
        preferences,
      })}`
    );
    dispatch(deviceBeginApiCall());
    dispatch(
      log({
        source: "device",
        level: "info",
        message: `Set date time preferences on ${device.connection.ipAddress}...`,
      })
    );
    return deviceApi
      .setDateTimePrefs({ ...device.connection, preferences })
      .then(() => {
        dispatch(
          log({
            source: "device",
            level: "info",
            message: "Date time preferences set",
          })
        );
        dispatch(setDateTimePrefsSuccess());
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          log({
            source: "device",
            level: "error",
            message:
              "Date time preferences failed to set: " + JSON.stringify(error),
          })
        );
      });
  };
}

export function deployPostRegistrationSettingsSuccess() {
  return { type: types.WEBEX_DEPLOY_POST_REGISTRATION_SETTINGS_SUCCESS };
}

export function deployPostRegistrationSettingsFailed() {
  return { type: types.WEBEX_DEPLOY_POST_REGISTRATION_SETTINGS_FAILED };
}

export function deployPostRegistrationSettings(webex, deviceId, preferences) {
  //eslint-disable-next-line no-unused-vars
  return async function (dispatch, getState) {
    console.log(
      `deployPostRegistrationSettings: ${JSON.stringify(preferences)}`
    );
    dispatch(webexBeginApiCall());
    dispatch(
      log({
        source: "webex",
        level: "info",
        message: `Deploy post registration settings: ${JSON.stringify(
          preferences
        )} to device ${deviceId}...`,
      })
    );
    const userData = {
      Active: "True",
      Username: preferences.localUser.username,
      Passphrase: preferences.localUser.password,
      PassphraseChangeRequired: "False",
      Role: ["Admin", "Audit", "User", "Integrator", "RoomControl"],
      ShellLogin: "True",
    };
    try {
      dispatch(
        log({
          source: "webex",
          level: "info",
          message: `about to createUser: ${JSON.stringify(userData)}`,
        })
      );
      const createUser = await webexApi.runXapiCommand(
        webex,
        deviceId,
        "UserManagement.User.Add",
        userData
      );
      dispatch(
        log({
          source: "webex",
          level: "info",
          message: `createUser done: ${JSON.stringify(createUser)}`,
        })
      );
      dispatch(deployPostRegistrationSettingsSuccess());
    } catch (error) {
      console.error(error);
      dispatch(
        log({
          source: "webex",
          level: "error",
          message:
            "Post registration settings failed to deploy: " + error.message,
        })
      );
      dispatch(deployPostRegistrationSettingsFailed());
    }
  };
}

export function getDevicesSuccess(info) {
  return { type: types.WEBEX_GET_DEVICES_SUCCESS, info };
}

export function getDevicesFailed(info) {
  return { type: types.WEBEX_GET_DEVICES_FAILED, info };
}

export function getDevices(webex, params, dispatchLog) {
  //eslint-disable-next-line no-unused-vars
  return async function (dispatch, getState) {
    dispatch(webexBeginApiCall());
    if (dispatchLog) {
      dispatch(
        log({
          source: "webex",
          level: "info",
          message: `Get devices...`,
        })
      );
    }
    try {
      const devices = await webexApi.getDevices(webex, params);
      if (dispatchLog) {
        dispatch(
          log({
            source: "webex",
            level: "info",

            message: `devices: ${JSON.stringify(devices)}, id: ${
              devices.items[0].id
            }`,
          })
        );
      }
      dispatch(
        getDevicesSuccess({
          deviceId: devices.items[0].id || "",
          webexInfo: devices.items[0],
        })
      );
    } catch (error) {
      console.error(error);
      if (dispatchLog) {
        dispatch(
          log({
            source: "webex",
            level: "error",
            message: "Get devices failed: " + JSON.stringify(error),
          })
        );
      }
      dispatch(getDevicesFailed(error));
    }
  };
}

export function setLanguageSuccess() {
  return { type: types.DEVICE_SET_LANGUAGE_SUCCESS };
}

export function setLanguageFailed() {
  return { type: types.DEVICE_SET_LANGUAGE_FAILED };
}

export function setLanguage(device, language) {
  //eslint-disable-next-line no-unused-vars
  return async function (dispatch, getState) {
    dispatch(deviceBeginApiCall());
    dispatch(
      log({
        source: "device",
        level: "info",
        message: `Set language to ${language} on ${device.connection.ipAddress}...`,
      })
    );
    return deviceApi
      .setLanguage({ ...device.connection, language })
      .then(() => {
        dispatch(
          log({
            source: "device",
            level: "info",
            message: "Language set",
          })
        );
        dispatch(setLanguageSuccess());
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          log({
            source: "device",
            level: "error",
            message: "Language failed to set: " + JSON.stringify(error),
          })
        );
      });
  };
}

export function createWorkspaceSuccess(workspace) {
  return { type: types.WEBEX_CREATE_WORKSPACE_SUCCESS, workspace };
}

export function createWorkspaceFailed() {
  return { type: types.WEBEX_CREATE_WORKSPACE_FAILED };
}

export function createWorkspace(webex, workspaceName, locationId, floorId) {
  //eslint-disable-next-line no-unused-vars
  return async function (dispatch, getState) {
    dispatch(webexBeginApiCall());
    dispatch(
      log({
        source: "webex",
        level: "info",
        message: `Create workspace "${workspaceName}"...`,
      })
    );
    return webexApi
      .createWorkspace(webex, workspaceName, locationId, floorId)
      .then((workspace) => {
        dispatch(
          log({
            source: "webex",
            level: "info",
            message: "Workspace created: " + JSON.stringify(workspace),
          })
        );
        dispatch(createWorkspaceSuccess(workspace));
        dispatch(loadWorkspaces(webex));
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          log({
            source: "webex",
            level: "error",
            message: "Workspace creation failed: " + JSON.stringify(error),
          })
        );
        dispatch(createWorkspaceFailed());
      });
  };
}
