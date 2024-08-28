import { getProfile } from "../api/profiles/getProfile.js";
import { renderProfile } from "../ui/renderProfile.js";
// import { renderProfileListings } from "../../ui/renderProfileListings.js"; // Assuming this renders listings
import { messageForUser } from "../ui/messageForUser.js";
import { displayUserListings } from "../handlers/displayAllUserListingsHandler.js";
import { displayUserWins } from "../handlers/displayAllUserWinsHandler.js";
import { displayUserBidHistory } from "../handlers/displayAllUserBidsHandler.js";

export async function displayOtherUserProfileHandler() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("username");

  if (!userName) {
    messageForUser("#profileContainer", "danger", "No username specified.");
    return;
  }

  try {
    // Fetch the user's profile data
    const profileData = await getProfile(userName);

    // Render the profile section
    renderProfile(profileData.data);

    // Display user's listings, wins, and bid history
    await displayUserListings(userName);
    await displayUserWins(userName);
    await displayUserBidHistory(userName);
  } catch (error) {
    console.error(error);
    messageForUser("#profileContainer", "danger", error.message);
  }
}

document.addEventListener("DOMContentLoaded", displayOtherUserProfileHandler);
