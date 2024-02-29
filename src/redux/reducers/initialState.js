import * as proxyModes from "../../constants/proxyModes";

export default {
  device: {
    connection: {
      ipAddress: "",
      username: "admin",
      password: "",
    },
    info: {
      serialNumber: "",
      model: "",
      platform: "",
      sowftwareVersion: "",
      status: "disconnected",
      statusDescription: "Disconnected",
      webexInfo: {},
    },
    activationCode: {},
    connectionConfigured: false,
    swChannel: "Stable",
    swUpdateInfo: {},
  },
  webex: {
    accessToken: "",
  },
  o365: {
    accessToken: "",
  },
  preferences: {
    proxy: {
      mode: proxyModes.OFF,
      host: "",
      port: "",
      pacUrl: "",
    },
    localUser: {
      username: "",
      password: "",
    },
    closeInitialWizard: true,
    installMTR: false,
    language: "English",
    timeZone: "Europe/London",
    timeFormat: "24H",
    dateFormat: "DD_MM_YY",
    deviceTemplate: null,
  },
  workspaces: [],
  apiCallsInProgress: {
    webexApiCallsInProgress: 0,
    o365ApiCallsInProgress: 0,
    deviceApiCallsInProgress: 0,
  },
  log: [
    {
      timeStamp: new Date().toISOString(),
      source: "app",
      level: "info",
      message: "Application started",
    },
  ],
};
