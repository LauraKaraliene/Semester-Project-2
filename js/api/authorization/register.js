import { registerUrl } from "../../constants/api.js";
import { headers } from "./headers.js";

export async function registerUser(userDetails) {
  const options = {
    method: "POST",
    body: JSON.stringify(userDetails),
    headers: headers(true),
  };
  const response = await fetch(registerUrl, options);
  const json = await response.json();

  if (response.ok) {
    return json;
  }

  throw new Error(json.errors?.[0]?.message || "An unknown error occurred.");
}
