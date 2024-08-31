// import { getAllUserWins } from "../../api/profiles/getAllUserWins.js";
// import { getUserName } from "../../utils/helpers/getUserName.js";
// import { renderAllListings } from "../../ui/renderAllListings.js";

// export async function displayAllUserWinsHandler() {
//   const userName = getUserName();
//   const winsContainer = "#allWins"; // Use the container selector as a string

//   try {
//     const wins = await getAllUserWins(userName);

//     if (wins.length === 0) {
//       document.querySelector(winsContainer).innerHTML += '<p class="text-muted">No wins to display yet.</p>';
//       return;
//     }

//     // Use the renderAllListings function to render the wins
//     renderAllListings(winsContainer, wins);
//   } catch (error) {
//     document.querySelector(winsContainer).innerHTML += "<p>Failed to load wins.</p>";
//     console.error("Error displaying user wins:", error);
//   }
// }

import { getAllUserWins } from "../../api/profiles/getAllUserWins.js";
import { renderAllListings } from "../../ui/renderAllListings.js";

export async function displayAllUserWinsHandler(userName) {
  const winsContainer = "#allWins"; // Use the container selector as a string

  try {
    const wins = await getAllUserWins(userName);

    // Clear previous content
    document.querySelector(winsContainer).innerHTML = "";

    if (wins.length === 0) {
      document.querySelector(winsContainer).innerHTML = '<p class="text-muted">No wins to display yet.</p>';
      return;
    }

    // Use the renderAllListings function to render the wins
    renderAllListings(winsContainer, wins);
  } catch (error) {
    document.querySelector(winsContainer).innerHTML = "<p>Failed to load wins.</p>";
    console.error("Error displaying user wins:", error);
  }
}
