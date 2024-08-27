import { headers } from "../authorization/headers.js";
import { listingsUrl } from "../../constants/api.js";

export async function editListing(listingId, listingData) {
  if (!listingId || !listingData || Object.keys(listingData).length === 0) {
    throw new Error("Listing ID and data cannot be empty");
  }

  const options = {
    method: "PUT",
    headers: headers(true), // Ensure Content-Type is set to application/json
    body: JSON.stringify(listingData),
  };

  const response = await fetch(`${listingsUrl}/${listingId}`, options);
  const results = await response.json();

  if (!response.ok) {
    throw new Error(results.errors[0]?.message || "Failed to update listing.");
  }

  return results;
}
