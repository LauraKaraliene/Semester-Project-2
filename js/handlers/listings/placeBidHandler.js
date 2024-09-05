import { placeBid } from "../../api/listings/placeBid.js";
import { getParams } from "../../utils/helpers/getParams.js";
import { messageForUser } from "../../ui/messageForUser.js";

export async function placeBidHandler() {
  const listingId = getParams("id");

  if (!listingId) {
    console.error("Listing ID is missing in the URL parameters.");
    messageForUser("#messageForUser", "danger", "Listing not found.");
    return;
  }

  const bidInput = document.querySelector("#placeYourBidInput");

  if (!bidInput) {
    console.error("Bid input element not found.");
    return;
  }

  const bidAmount = parseFloat(bidInput.value);

  if (isNaN(bidAmount) || bidAmount <= 0) {
    messageForUser("#messageForUser", "danger", "Please enter a valid bid amount.");
    return;
  }

  try {
    await placeBid(listingId, bidAmount);
    messageForUser("#messageForUser", "success", "Bid placed successfully.");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error("Error placing bid:", error);
    messageForUser("#messageForUser", "danger", "Failed to place bid.");
  }
}
