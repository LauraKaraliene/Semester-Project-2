import { searchListings } from "../../api/listings/searchListings.js";
import { renderAllListings } from "../../ui/renderAllListings.js";
import { messageForUser } from "../../ui/messageForUser.js";

export function displaySearchResults() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("search");

  if (searchQuery) {
    searchListings(searchQuery)
      .then((listings) => {
        if (listings.length > 0) {
          renderAllListings("#listings", listings);
        } else {
          messageForUser("#messageForUser", "danger", "No listings found with the provided input.");
        }
      })
      .catch((error) => {
        console.error("Search failed:", error);
        messageForUser("#messageForUser", "danger", "No listings found with the provided input.");
      });
  }
}
