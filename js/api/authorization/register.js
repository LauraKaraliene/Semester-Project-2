import { registerUrl } from "../../constants/api.js";

export async function registerUser(userDetails) {
  const options = {
    method: "POST",
    body: JSON.stringify(userDetails),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(registerUrl, options);
  const json = await response.json();

  if (response.ok) {
    return json;
  }

  throw new Error(json.errors?.[0]?.message || "An unknown error occurred.");
}
