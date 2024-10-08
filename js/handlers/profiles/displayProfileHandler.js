import { getProfile } from "../../api/profiles/getProfile.js";
import { renderProfile } from "../../ui/renderProfile.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { displayAllUserBidsHandler } from "./displayAllUserBidsHandler.js";
import { displayAllUserListingsHandler } from "./displayAllUserListingsHandler.js";
import { displayAllUserWinsHandler } from "./displayAllUserWinsHandler.js";
import { getUserName } from "../../utils/helpers/getUserName.js";

export async function displayProfileHandler() {
  const userName = getUserName();

  try {
    const profileData = await getProfile(userName);
    renderProfile(profileData.data);

    await displayAllUserBidsHandler(userName);
    await displayAllUserListingsHandler(userName);
    await displayAllUserWinsHandler(userName);
  } catch (error) {
    console.error("Error fetching profile data:", error);
    messageForUser("#profileContainer", "danger", error.message);
  }
}
