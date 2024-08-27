import { getAllUserListings } from "../../api/profiles/getAllUserListings.js";
import { getUserName } from "../../utils/helpers/getUserName.js";
import { renderAllListings } from "../../ui/renderAllListings.js";

export async function displayAllUserListingsHandler() {
  const userName = getUserName();
  const listingsContainer = "#allAuctions"; // Change to the correct section ID

  try {
    const listings = await getAllUserListings(userName);

    if (listings.length === 0) {
      document.querySelector(listingsContainer).innerHTML += "<p>No auctions to display yet.</p>";
      return;
    }

    // Use the renderAllListings function to render the listings
    renderAllListings(listingsContainer, listings);
  } catch (error) {
    document.querySelector(listingsContainer).innerHTML += "<p>Failed to load listings.</p>";
    console.error("Error displaying user listings:", error);
  }
}

// export async function displayAllUserListingsHandler() {
//   const userName = getUserName();
//   const listingsContainer = "#profileContainer"; // Use the container selector as a string

//   try {
//     const listings = await getAllUserListings(userName);

//     if (listings.length === 0) {
//       document.querySelector(listingsContainer).innerHTML += "<p>No auctions to display yet.</p>";
//       return;
//     }

//     // Use the renderAllListings function to render the listings
//     renderAllListings(listingsContainer, listings);
//   } catch (error) {
//     document.querySelector(listingsContainer).innerHTML += "<p>Failed to load listings.</p>";
//     console.error("Error displaying user listings:", error);
//   }
// }
