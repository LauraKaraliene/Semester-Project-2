import { profilesUrl } from "../../constants/api.js";
import { headers } from "../authorization/headers.js";

export async function getProfile(userName) {
  const url = `${profilesUrl}/${userName}`;

  const options = {
    headers: headers(),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json();
    console.error("Error fetching profile:", error.errors[0].message);
    throw new Error(error.errors[0].message);
  }

  const profileData = await response.json();
  return profileData;
}
