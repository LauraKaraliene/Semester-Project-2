// import { getProfile } from "../../api/profiles/getProfile.js";
// import { renderProfile } from "../../ui/renderProfile.js";
// import { messageForUser } from "../../ui/messageForUser.js";
// import { displayAllUserBidsHandler } from "./displayAllUserBidsHandler.js";
// import { displayAllUserListingsHandler } from "./displayAllUserListingsHandler.js";
// import { displayAllUserWinsHandler } from "./displayAllUserWinsHandler.js";

// export async function displayOtherUserProfileHandler() {
//   // Get the username from the URL parameters
//   const urlParams = new URLSearchParams(window.location.search);
//   const userName = urlParams.get("username");

//   if (!userName) {
//     // If username is not provided, show an error message
//     messageForUser("#profileContainer", "danger", "No username specified.");
//     return;
//   }

//   try {
//     // Fetch the user's profile data
//     const profileData = await getProfile(userName);
//     renderProfile(profileData.data); // Render the profile data

//     // Display user's bids, listings, and wins
//     await displayAllUserBidsHandler(userName);
//     await displayAllUserListingsHandler(userName);
//     await displayAllUserWinsHandler(userName);
//   } catch (error) {
//     console.error(error);
//     messageForUser("#profileContainer", "danger", error.message);
//   }
// }

// // Trigger the handler when the document is loaded
// document.addEventListener("DOMContentLoaded", displayOtherUserProfileHandler);

import { getProfile } from "../../api/profiles/getProfile.js";
import { renderOtherUserProfile } from "../../ui/renderOtherUserProfile.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { displayAllUserBidsHandler } from "./displayAllUserBidsHandler.js";
import { displayAllUserListingsHandler } from "./displayAllUserListingsHandler.js";
import { displayAllUserWinsHandler } from "./displayAllUserWinsHandler.js";

export async function displayOtherUserProfileHandler() {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get("username");

  if (!userName) {
    messageForUser("#profileContainer", "danger", "No username specified.");
    return;
  }

  try {
    const profileData = await getProfile(userName);
    console.log("Profile data retrieved:", profileData);

    renderOtherUserProfile(profileData.data);

    await displayAllUserBidsHandler(userName);
    await displayAllUserListingsHandler(userName);
    await displayAllUserWinsHandler(userName);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    messageForUser("#profileContainer", "danger", error.message);
  }
}
