import { profilesUrl } from "../../constants/api.js";
import { headers } from "../authorization/headers.js";

export async function editProfile(userName, profileData) {
  const url = `${profilesUrl}/${userName}`;
  const options = {
    method: "PUT",
    headers: headers(true), // Pass true to ensure Content-Type is set
    body: JSON.stringify(profileData),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors[0].message || "Failed to update profile.");
  }

  return await response.json();
}
