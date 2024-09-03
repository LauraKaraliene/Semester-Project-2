// import * as utils from "../storage/storage.js";

// export function loggedIn() {
//   const token = utils.get("token");
//   if (token) {
//     return true;
//   }
//   return false;
// }

import { get } from "../storage/get.js";

export function loggedIn() {
  const token = get("token");
  return !!token; // Returns true if token exists, otherwise false
}
