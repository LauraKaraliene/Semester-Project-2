import { getAllUserWins } from "../../api/profiles/getAllUserWins.js";
import { renderAllListings } from "../../ui/renderAllListings.js";

export async function displayAllUserWinsHandler(userName) {
  const winsContainer = "#allWins";

  try {
    const wins = await getAllUserWins(userName);
    document.querySelector(winsContainer).innerHTML = "";

    if (wins.length === 0) {
      document.querySelector(winsContainer).innerHTML = '<p class="text-muted">No wins to display yet.</p>';
      return;
    }

    renderAllListings(winsContainer, wins);
  } catch (error) {
    document.querySelector(winsContainer).innerHTML = "<p>Failed to load wins.</p>";
    console.error("Error displaying user wins:", error);
  }
}
