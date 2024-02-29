import { handleResponse, handleError } from "./apiUtils";

export async function getManifest(modelName, channel = "Stable") {
  const url = new URL(
    `https://client-upgrade-a.wbx2.com/client-upgrade/api/v1/ce/upgrade/@me?channel=${channel}&model=${encodeURIComponent(
      modelName
    )}`
  );
  console.log(`getManifest: ${url}`);
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then(handleResponse)
    .catch(handleError);
}
