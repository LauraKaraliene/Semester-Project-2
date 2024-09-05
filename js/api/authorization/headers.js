import { get } from "../../utils/storage/get.js";
import { apiKey } from "./apiKey.js";

export function headers(hasBody = false) {
  const headers = new Headers();
  const token = get("token");

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  if (apiKey) {
    headers.append("X-Noroff-API-Key", apiKey);
  }
  if (hasBody) {
    headers.append("Content-Type", "application/json");
  }
  return headers;
}
