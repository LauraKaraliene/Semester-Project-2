import { getUserName } from "../../utils/helpers/getUserName.js";
import { editProfile } from "../../api/profiles/editProfile.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { headers } from "../../api/authorization/headers.js";
import { profilesUrl } from "../../constants/api.js";

export function editProfileHandler() {
  document.querySelector(".btn.text-primary").addEventListener("click", function () {
    const editProfileModal = new bootstrap.Modal(document.getElementById("editProfileModal"));
    editProfileModal.show();
  });

  //backdrop is removed when the modal is closed
  document.getElementById("editProfileModal").addEventListener("hidden.bs.modal", function () {
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
  });

  // Handle the form submission inside the modal
  const form = document.querySelector("#editProfileForm");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const profileData = Object.fromEntries(formData.entries());
    const profile = {};

    if (profileData.bio) {
      profile.bio = profileData.bio;
    }
    if (profileData["avatar-url"]) {
      profile.avatar = {
        url: profileData["avatar-url"],
        alt: profileData["avatar-alt"] || "",
      };
    }

    // Ensure at least one field is present
    if (Object.keys(profile).length === 0) {
      messageForUser("#messageForUser", "danger", "Please provide at least one field to update.");
      return;
    }
    try {
      const userName = getUserName();
      console.log("Profile data to be sent:", profile);
      console.log("Profile data to be sent:", profile);
      console.log("API URL:", `${profilesUrl}/${userName}`);
      console.log("Request Headers:", headers(true));

      await editProfile(userName, profile);
      messageForUser("#messageForUser", "success", "Profile updated successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      messageForUser("#messageForUser", "danger", error.message || "Sorry, we couldn't update the profile.");
    }
  });
}

document.addEventListener("DOMContentLoaded", editProfileHandler);
