// import { requireRegistration } from "../../api/authorization/requireRegistration.js";

// export function requireRegistrationHandler() {
//   console.log("Initializing registration checks...");

//   document.addEventListener("DOMContentLoaded", () => {
//     console.log("DOM fully loaded. Applying registration checks...");

//     requireRegistration("profileLink", "You must be registered to view your profile.");
//     requireRegistration("sellLink", "You must be registered to sell items.");
//     requireRegistration("placeBidButton", "You must be registered to place a bid.");
//   });
// }

import { requireRegistration } from "../../api/authorization/requireRegistration.js";

export function requireRegistrationHandler() {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("requireRegistrationHandler.js loaded");

    const profileLink = document.getElementById("profileLink");
    const sellLink = document.getElementById("sellLink");
    const placeBidButton = document.getElementById("placeBidButton");

    if (profileLink) {
      console.log("Profile link found");
    } else {
      console.error("Profile link not found");
    }

    if (sellLink) {
      console.log("Sell link found");
    } else {
      console.error("Sell link not found");
    }

    if (placeBidButton) {
      console.log("Place bid button found");
    } else {
      console.error("Place bid button not found");
    }

    // Attach the requireRegistration functionality to the elements
    requireRegistration("profileLink", "You must be registered to view your profile.");
    requireRegistration("sellLink", "You must be registered to sell items.");
    requireRegistration("placeBidButton", "You must be registered to place a bid.");
  });
}
