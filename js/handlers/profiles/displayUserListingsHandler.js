import { getUserName } from "../../utils/storage.js";
import { headers } from "../../api/authorization/headers.js";
import { profilesUrl } from "../../constants/api.js";
import { renderListings } from "../../ui/renderListings.js";

export async function displayUserListingsHandler() {
  const userName = getUserName();
  const url = `${profilesUrl}/${userName}/listings`;

  try {
    const response = await fetch(url, {
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user listings.");
    }

    const listingsData = await response.json();
    renderListings(listingsData.data);
  } catch (error) {
    console.error(error);
    // Handle errors, e.g., display a message to the user
  }
}
