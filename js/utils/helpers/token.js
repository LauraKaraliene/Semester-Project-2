import * as utils from "../storage/storage.js";

export function getToken() {
  const token = utils.get("token");
  return token;
}
