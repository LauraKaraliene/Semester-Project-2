import { authLinkHandler } from "./handlers/authorization/authLinkHandler.js";
import { loginFormHandler } from "./handlers/authorization/loginFormHandler.js";
import { registerFormHandler } from "./handlers/authorization/registerFormHandler.js";
import { displayAllListingsHandler } from "./handlers/listings/displayAllListingsHandler.js";
import { logoutHandler } from "./handlers/authorization/logoutHandler.js";
import { displaySingleListingHandler } from "./handlers/listings/displaySingleListingHandler.js";
import { searchListingsHandler } from "./handlers/listings/searchListingsHandler.js";
import { displaySearchResults } from "./handlers/listings/displaySearchResults.js";
import { displayProfileHandler } from "./handlers/profiles/displayProfileHandler.js";
import { editProfileHandler } from "./handlers/profiles/editProfileHandler.js";
import { addListingHandler } from "./handlers/listings/addListingHandler.js";
import { editListingHandler } from "./handlers/listings/editListingHandler.js";
import { deleteListingHandler } from "./handlers/listings/deleteListingHandler.js";
import { placeBidHandler } from "./handlers/listings/placeBidHandler.js";
import { displayOtherUserProfileHandler } from "./handlers/profiles/displayOtherUserProfileHandler.js";
import { handleRestrictedLinks } from "./ui/hideElements.js";
import { handleScrollButton } from "./handlers/listings/handleScrollButton.js";

document.addEventListener("DOMContentLoaded", () => {
  handleRestrictedLinks();
});

function route() {
  const path = window.location.pathname;
  console.log("Current path:", path);
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search");

  switch (path) {
    case "/":
    case "/index.html":
      authLinkHandler();
      logoutHandler();

      if (searchQuery) {
        displaySearchResults();
      } else {
        displayAllListingsHandler("");
      }
      searchListingsHandler();
      handleScrollButton();
      break;
    case "/listing/":
    case "/listing/listing.html":
      authLinkHandler();
      logoutHandler();
      displaySingleListingHandler();
      searchListingsHandler();
      deleteListingHandler();
      placeBidHandler();
      break;
    case "/register/":
    case "/register/index.html":
      registerFormHandler();
      break;
    case "/login/":
    case "/login/index.html":
      loginFormHandler();
      break;
    case "/profile/":
    case "/profile/index.html":
      authLinkHandler();
      logoutHandler();
      searchListingsHandler();
      displayProfileHandler();
      editProfileHandler();
      document.getElementById("newListingButton").addEventListener("click", function () {
        window.location.href = "/profile/add-listing.html";
      });
      break;
    case "/profile/add-listing.html":
      authLinkHandler();
      searchListingsHandler();
      addListingHandler();
      logoutHandler();
      break;
    case "/profile/edit-listing.html":
      editListingHandler();
      break;
    case "/profile/other-user-profile.html":
      authLinkHandler();
      searchListingsHandler();
      logoutHandler();
      displayOtherUserProfileHandler();
      break;
    case "/about/":
    case "/about/index.html":
      authLinkHandler();
      logoutHandler();
      searchListingsHandler();
      break;
    default:
      console.warn("No specific handler for this path:", path);
      break;
  }
}

document.addEventListener("DOMContentLoaded", route);
