import * as utils from "../storage/storage.js";

export function loggedIn() {
  const token = utils.get("token");
  if (token) {
    return true;
  }
  return false;
}
