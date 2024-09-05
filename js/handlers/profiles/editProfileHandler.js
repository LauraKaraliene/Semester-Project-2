import { getUserName } from "../../utils/helpers/getUserName.js";
import { editProfile } from "../../api/profiles/editProfile.js";
import { messageForUser } from "../../ui/messageForUser.js";

export function editProfileHandler() {
  const editProfileButton = document.querySelector(".btn.text-primary");
  const editProfileModalElement = document.getElementById("editProfileModal");
  const editProfileForm = document.querySelector("#editProfileForm");

  if (editProfileButton && editProfileModalElement && editProfileForm) {
    editProfileButton.addEventListener("click", function () {
      const editProfileModal = new bootstrap.Modal(editProfileModalElement);
      editProfileModal.show();
    });

    editProfileModalElement.addEventListener("hidden.bs.modal", function () {
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.remove();
      }
    });

    editProfileForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData(editProfileForm);
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

      if (Object.keys(profile).length === 0) {
        messageForUser("#messageForUser", "danger", "Please provide at least one field to update.");
        return;
      }
      try {
        const userName = getUserName();

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
  } else {
    console.warn("Edit profile elements not found on this page.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const editProfileModalElement = document.getElementById("editProfileModal");
  if (editProfileModalElement) {
    editProfileHandler();
  }
});
