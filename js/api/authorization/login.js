import { loginUrl } from "../../constants/api.js";

export async function loginUser(userDetails) {
  const options = {
    method: "POST",
    body: JSON.stringify(userDetails),
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(loginUrl, options);

  const json = (await response.json()).data;

  if (response.ok) {
    return json;
  }
  throw new Error(json.errors[0].message);
}
