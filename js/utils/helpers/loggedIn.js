import { get } from "../storage/get.js";

export function loggedIn() {
  const token = get("token");
  return !!token;
}
