import { listingsUrl } from "../../constants/api.js";
import { headers } from "../authorization/headers.js";

export async function placeBid(listingId, bidAmount) {
  // Correctly pass the bidAmount variable
  const bidData = { amount: bidAmount };

  const options = {
    method: "POST",
    headers: headers(true),
    body: JSON.stringify(bidData),
  };

  const bidUrl = `${listingsUrl}/${listingId}/bids`;
  const response = await fetch(bidUrl, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errors[0]?.message || "Failed to place bid.");
  }

  return response.json();
}

// import { listingsUrl } from "../../constants/api.js";
// import { headers } from "../authorization/headers.js";

// export async function placeBid(listingId, bidAmount) {
//   const bidData = { amount };

//   const options = {
//     method: "POST",
//     headers: headers(true),
//     body: JSON.stringify(bidData),
//   };

//   const bidUrl = `${listingsUrl}/${listingId}/bids`;
//   const response = await fetch(bidUrl, options);

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.errors[0]?.message || "Failed to place bid.");
//   }

//   return response.json();
// }
