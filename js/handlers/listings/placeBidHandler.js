import { placeBid } from "../../api/listings/placeBid.js";
import { getParams } from "../../utils/helpers/getParams.js";
import { messageForUser } from "../../ui/messageForUser.js";

export async function placeBidHandler() {
  // Get the listing ID from the URL parameters
  const listingId = getParams("id");

  if (!listingId) {
    console.error("Listing ID is missing in the URL parameters.");
    messageForUser("#messageForUser", "danger", "Listing not found.");
    return;
  }

  // Get the bid amount from the input field
  const bidInput = document.querySelector("#placeYourBidInput");
  // Check if the input field exists
  if (!bidInput) {
    console.error("Bid input element not found.");
    return;
  }

  const bidAmount = parseFloat(bidInput.value);

  if (isNaN(bidAmount) || bidAmount <= 0) {
    // Display an inline error
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

// import { placeBid } from "../../api/listings/placeBid.js";
// import { getParams } from "../../utils/helpers/getParams.js";
// import { messageForUser } from "../../ui/messageForUser.js";

// export async function placeBidHandler() {
//   // Get the listing ID from the URL parameters
//   const listingId = getParams("id");

//   // Check if the listing ID is available
//   if (!listingId) {
//     console.error("Listing ID is missing in the URL parameters.");
//     messageForUser("#messageForUser", "danger", "Listing not found.");
//     return;
//   }

//   // Prompt the user to enter a bid amount
//   const bidAmount = parseFloat(prompt("Enter your bid amount:"));

//   // Validate the bid amount
//   if (isNaN(bidAmount) || bidAmount <= 0) {
//     alert("Please enter a valid bid amount.");
//     return;
//   }

//   try {
//     // Place the bid using the API function
//     await placeBid(listingId, bidAmount);

//     // Show a success message to the user
//     messageForUser("#messageForUser", "success", "Bid placed successfully.");

//     // Optionally, refresh the page or update the bid history to reflect the new bid
//     setTimeout(() => {
//       window.location.reload();
//     }, 2000);
//   } catch (error) {
//     console.error("Error placing bid:", error);
//     messageForUser("#messageForUser", "danger", "Failed to place bid.");
//   }
// }

// import { placeBid } from "../../api/listings/placeBid.js";
// import { messageForUser } from "../../ui/messageForUser.js";
// import { getParams } from "../../utils/helpers/getParams.js";

// export function placeBidHandler() {
//   const listingId = getParams("id");

//   if (!listingId) {
//     console.warn("No listing ID found in URL. Skipping place bid handler.");
//     return;
//   }

//   const bidButton = document.querySelector("#placeBidButton");

//   if (!bidButton) return;

//   bidButton.addEventListener("click", async () => {
//     const bidAmount = prompt("Enter your bid amount:");

//     if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
//       alert("Please enter a valid bid amount.");
//       return;
//     }

//     try {
//       await placeBid(listingId, parseFloat(bidAmount));
//       messageForUser("#messageForUser", "success", "Bid placed successfully.");
//       window.location.reload(); // Refresh the page to show the updated bid
//     } catch (error) {
//       console.error("Error placing bid:", error);
//       messageForUser("#messageForUser", "danger", "Failed to place bid.");
//     }
//   });
// }
