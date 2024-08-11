import * as utils from "../storage/storage.js";

export function getUserName() {
  return utils.get("userName");
}
