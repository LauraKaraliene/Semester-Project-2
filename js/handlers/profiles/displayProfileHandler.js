import { getProfile } from "../../api/profiles/getProfile.js";
import { renderProfile } from "../../ui/renderProfile.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { displayAllUserBidsHandler } from "./displayAllUserBidsHandler.js";
import { displayAllUserListingsHandler } from "./displayAllUserListingsHandler.js";
import { displayAllUserWinsHandler } from "./displayAllUserWinsHandler.js";
import { getUserName } from "../../utils/helpers/getUserName.js";

export async function displayProfileHandler() {
  const userName = getUserName();
  console.log("Logged-in user's name:", userName);

  try {
    const profileData = await getProfile(userName);
    console.log("Profile data retrieved:", profileData);

    renderProfile(profileData.data);

    await displayAllUserBidsHandler(userName);
    await displayAllUserListingsHandler(userName);
    await displayAllUserWinsHandler(userName);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    messageForUser("#profileContainer", "danger", error.message);
  }
}

// export async function displayProfileHandler() {
//   const userName = getUserName();
//   console.log("Logged-in user's name:", userName);

//   try {
//     const profileData = await getProfile(userName);
//     console.log("Profile data retrieved:", profileData); // Debugging line

//     renderProfile(profileData.data);

//     // Display user's bids, listings, and wins
//     await displayAllUserBidsHandler(userName);
//     await displayAllUserListingsHandler(userName);
//     await displayAllUserWinsHandler(userName);
//   } catch (error) {
//     console.error("Error fetching profile data:", error);
//     messageForUser("#profileContainer", "danger", error.message);
//   }
// }
