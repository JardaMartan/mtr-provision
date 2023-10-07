import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "https://webexapis.com/v1";

function createHeaders(webex) {
  return {
    Authorization: "Bearer " + webex.accessToken,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export async function callWebex(
  webex,
  path,
  method = "GET",
  params = {},
  body = null
) {
  const url = new URL(baseUrl + path);
  // console.log(`params: ${JSON.stringify(params)}`);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  console.log(`callWebex: ${url}, body: ${JSON.stringify(body, null, 2)}`);
  return fetch(url, {
    method,
    headers: createHeaders(webex),
    body: body ? JSON.stringify(body, null, 2) : null,
  })
    .then(handleResponse)
    .catch(handleError);
}

export async function getMe(webex) {
  return callWebex(webex, "/people/me");
}

export async function getWorkspaces(webex) {
  return callWebex(
    webex,
    "/workspaces",
    "GET"
    //  { calling: "none"}
  );
}

export async function createActivationCode(webex, workspaceId) {
  return callWebex(
    webex,
    "/devices/activationCode",
    "POST",
    {},
    {
      workspaceId,
    }
  );
}

export async function getDevices(webex, params = {}) {
  return callWebex(webex, "/devices", "GET", params);
}

export async function runXapiCommand(webex, deviceId, command, args) {
  const body = { deviceId, arguments: args };
  return callWebex(webex, `/xapi/command/${command}`, "POST", {}, body);
}

export async function getLocations(webex, params = {}) {
  return callWebex(webex, "/workspaceLocations", "GET", params);
}

export async function getLocationFloors(webex, locationId) {
  return callWebex(webex, `/workspaceLocations/${locationId}/floors`, "GET");
}

export async function createWorkspace(webex, displayName, locationId, floorId) {
  const body = { displayName };
  if (locationId) {
    body.workspaceLocationId = locationId;
  }
  if (floorId) {
    body.floorId = floorId;
  }
  return callWebex(webex, "/workspaces", "POST", {}, body);
}
