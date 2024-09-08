import { getAllUserListings } from "../../api/profiles/getAllUserListings.js";
import { renderAllListings } from "../../ui/renderAllListings.js";

export async function displayAllUserListingsHandler(userName) {
  const listingsContainer = "#allAuctions";

  try {
    const listings = await getAllUserListings(userName);
    if (listings.length === 0) {
      document.querySelector(listingsContainer).innerHTML += "<p>No auctions to display yet.</p>";
      return;
    }

    renderAllListings(listingsContainer, listings, "../");
  } catch (error) {
    document.querySelector(listingsContainer).innerHTML += "<p>Failed to load listings.</p>";
    console.error("Error displaying user listings:", error);
  }
}
