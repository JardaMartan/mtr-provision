const ipAddress = "192.168.101.98";
const username = "cisco";
const password = "C1sco123";

const device = {
  ipAddress,
  username,
  password,
};

async function getXAPI(ipAddress, username, password) {
  return new Promise((resolve, reject) => {
    console.log(`device IP: ${ipAddress}`);
    const jsxapi = require("jsxapi");

    jsxapi
      .connect(`wss://${ipAddress}`, {
        username,
        password,
      })
      .on("error", (error) => {
        console.error(error);
        reject(error); // Reject the Promise if there's an error
      })
      .on("ready", async (xapi) => {
        try {
          const status = await xapi.Status.SystemUnit.get();
          xapi.close();
          resolve(status); // Resolve the Promise with the status
        } catch (error) {
          console.error(error);
          xapi.close();
          reject(error); // Reject the Promise if there's an error
        }
      });
  });
}

async function getDeviceInfo({ ipAddress, username, password }) {
  return new Promise((resolve, reject) => {
    console.log(`device IP: ${ipAddress}`);
    const jsxapi = require("jsxapi");

    jsxapi
      .connect(`ws://${ipAddress}`, {
        username,
        password,
      })
      .on("error", (error) => {
        console.error(error);
        reject(error); // Reject the Promise if there's an error
      })
      .on("ready", async (xapi) => {
        try {
          const status = await xapi.Status.SystemUnit.get();
          xapi.close();
          resolve(status); // Resolve the Promise with the status
        } catch (error) {
          console.error(error);
          xapi.close();
          reject(error); // Reject the Promise if there's an error
        }
      });
  });
}

async function logResult() {
  const result = await getDeviceInfo(device);
  console.log(`result: ${JSON.stringify(result, null, 2)}`);
}

logResult();
