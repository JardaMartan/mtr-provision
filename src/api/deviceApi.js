import * as proxyModes from "../constants/proxyModes";
// import { Buffer } from "buffer";

global.Buffer = global.Buffer || require("buffer").Buffer;
// Buffer.from("anything", "base64");

async function createXapiClient(ipAddress, username, password) {
  return new Promise((resolve, reject) => {
    console.log(`device IP: ${ipAddress}`);
    const jsxapi = require("jsxapi");

    jsxapi
      .connect(`wss://${ipAddress}`, {
        username,
        password,
      })
      .on("error", (error) => {
        if (error) {
          reject(error); // Reject the Promise if there's an error
        }
      })
      .on("ready", async (xapi) => {
        console.log(`xapi connected to ${ipAddress}`);
        try {
          resolve(xapi); // Resolve the Promise with the status
        } catch (error) {
          console.error(error);
          reject(error); // Reject the Promise if there's an error
        }
      });
  });
}

export async function getDeviceInfo({ ipAddress, username, password }) {
  return new Promise((resolve, reject) => {
    createXapiClient(ipAddress, username, password)
      .then(async (xapi) => {
        try {
          const status = await xapi.Status.SystemUnit.get();
          xapi.close();
          console.log(`received status: ${JSON.stringify(status)}`);
          resolve(status); // Resolve the Promise with the status
        } catch (error) {
          console.error(error);
          xapi.close();
          reject(error); // Reject the Promise if there's an error
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error); // Reject the Promise if there's an error
      });
  });
}

export async function setDeviceConfig({
  ipAddress,
  username,
  password,
  preferences,
}) {
  return new Promise((resolve, reject) => {
    createXapiClient(ipAddress, username, password).then(async (xapi) => {
      try {
        const configResult = [];
        console.log("set proxy mode to " + preferences.proxy.mode);
        await xapi.Config.NetworkServices.HTTP.Proxy.Mode.set(
          preferences.proxy.mode
        );
        configResult.push("proxy mode set");
        console.log("proxy mode set to " + preferences.proxy.mode);
        switch (preferences.proxy.mode) {
          case proxyModes.OFF:
            break;
          case proxyModes.MANUAL:
            await xapi.Config.NetworkServices.HTTP.Proxy.Url.set(
              `http://${preferences.proxy.host}:${preferences.proxy.port}`
            );
            console.log(
              "proxy url set to " +
                preferences.proxy.host +
                ":" +
                preferences.proxy.port
            );
            break;
          case proxyModes.PAC_URL:
            await xapi.Config.NetworkServices.HTTP.Proxy.PACUrl.set(
              preferences.proxy.pacUrl
            );
            console.log("proxy pac url set to " + preferences.proxy.pacUrl);
            break;
          default:
            break;
        }
        configResult.push("proxy url set");
        xapi.close();
        resolve(configResult); // Resolve the Promise with the status
      } catch (error) {
        console.error(error);
        reject(error); // Reject the Promise if there's an error
      }
    });
  });
}

export async function registerDeviceToWebex({
  ipAddress,
  username,
  password,
  activationCode,
}) {
  return new Promise((resolve, reject) => {
    createXapiClient(ipAddress, username, password).then(async (xapi) => {
      try {
        const configResult = [];
        await xapi.Command.Webex.Registration.Start({
          RegistrationType: "Manual",
          SecurityAction: "Harden",
          ActivationCode: activationCode,
        });
        configResult.push("registration started");
        console.log("registration started");
        xapi.close();
        resolve(configResult); // Resolve the Promise with the status
      } catch (error) {
        console.error(error);
        reject(error); // Reject the Promise if there's an error
      }
    });
  });
}

export async function closeFirstTimeWizard({ ipAddress, username, password }) {
  return new Promise((resolve, reject) => {
    createXapiClient(ipAddress, username, password).then(async (xapi) => {
      console.log("close first time wizard at " + ipAddress);
      try {
        const configResult = [];
        await xapi.Command.SystemUnit.FirstTimeWizard.Stop();
        configResult.push("first time wizard finished");
        console.log("first time wizard finished");
        xapi.close();
        resolve(configResult); // Resolve the Promise with the status
      } catch (error) {
        console.error(error);
        reject(error); // Reject the Promise if there's an error
      }
    });
  });
}

export async function setDateTimePrefs({
  ipAddress,
  username,
  password,
  preferences,
}) {
  return new Promise((resolve, reject) => {
    createXapiClient(ipAddress, username, password).then(async (xapi) => {
      try {
        const configResult = [];
        await xapi.Config.Time.Zone.set(preferences.timeZone);
        configResult.push("time zone set");
        console.log("time zone set to " + preferences.timeZone);
        await xapi.Config.Time.DateFormat.set(preferences.dateFormat);
        configResult.push("date format set");
        console.log("date format set to " + preferences.dateFormat);
        await xapi.Config.Time.TimeFormat.set(preferences.timeFormat);
        configResult.push("time format set");
        console.log("time format set to " + preferences.timeFormat);
        xapi.close();
        resolve(configResult); // Resolve the Promise with the status
      } catch (error) {
        console.error(error);
        reject(error); // Reject the Promise if there's an error
      }
    });
  });
}

export async function setLanguage({ ipAddress, username, password, language }) {
  return new Promise((resolve, reject) => {
    createXapiClient(ipAddress, username, password).then(async (xapi) => {
      try {
        const configResult = [];
        const res = await xapi.Config.UserInterface.Language.set(language);
        configResult.push("language set, result: " + JSON.stringify(res));
        console.log("language set to " + language);
        xapi.close();
        resolve(configResult); // Resolve the Promise with the status
      } catch (error) {
        console.error(`language set error: ${JSON.stringify(error)}`);
        reject(error); // Reject the Promise if there's an error
      }
    });
  });
}

export async function resetDevice({ ipAddress, username, password }) {
  return new Promise((resolve, reject) => {
    createXapiClient(ipAddress, username, password).then(async (xapi) => {
      try {
        const configResult = [];
        const res = await xapi.Command.SystemUnit.Boot({
          Action: "Restart",
          Force: "True",
        });
        configResult.push("device reset, result: " + JSON.stringify(res));
        console.log("device reset");
        xapi.close();
        resolve(configResult); // Resolve the Promise with the status
      } catch (error) {
        console.error(`device reset error: ${JSON.stringify(error)}`);
        reject(error); // Reject the Promise if there's an error
      }
    });
  });
}
