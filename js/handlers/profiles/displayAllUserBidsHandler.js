import { getAllUserBids } from "../../api/profiles/getAllUserBids.js";
import { getUserName } from "../../utils/helpers/getUserName.js";

export async function displayAllUserBidsHandler() {
  const userName = getUserName();
  const bidsContainer = "#bidHistory";

  try {
    const bids = await getAllUserBids(userName);

    if (bids.length === 0) {
      document.querySelector(bidsContainer).innerHTML += '<p class="text-muted">No bids to display yet.</p>';
      return;
    }

    const bidsList = document.createElement("ul");
    bidsList.classList.add("list-group");

    bids.forEach((bid) => {
      const bidItem = document.createElement("li");
      bidItem.classList.add("list-group-item", "mb-3");

      bidItem.innerHTML = `
        <p><strong>Bid Amount:</strong> ${bid.amount}</p>
        <p><strong>Listing:</strong> ${bid.listing?.title ?? "Unknown listing"}</p>
        <p><strong>Date:</strong> ${new Date(bid.created).toLocaleString()}</p>
      `;

      bidsList.appendChild(bidItem);
    });

    document.querySelector(bidsContainer).innerHTML = "";
    document.querySelector(bidsContainer).appendChild(bidsList);
  } catch (error) {
    document.querySelector(bidsContainer).innerHTML += "<p>Failed to load bid history.</p>";
    console.error("Error displaying user bids:", error);
  }
}
