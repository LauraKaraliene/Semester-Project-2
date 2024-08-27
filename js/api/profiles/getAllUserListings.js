import { headers } from "../authorization/headers.js";
import { profilesUrl } from "../../constants/api.js";

export async function getAllUserListings(userName) {
  const url = `${profilesUrl}/${userName}/listings`;

  const options = {
    method: "GET",
    headers: headers(true),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch user listings.");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching user listings:", error);
    throw error;
  }
}
