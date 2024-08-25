import { getProfile } from "../../api/profiles/getProfile.js";
import { renderProfile } from "../../ui/renderProfile.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { getUserName } from "../../utils/helpers/getUserName.js";

export async function displayProfileHandler() {
  const userName = getUserName();

  try {
    const profileData = await getProfile(userName);
    renderProfile(profileData.data);
  } catch (error) {
    console.error(error);
    messageForUser("#profileContainer", "danger", error.message);
  }
}
