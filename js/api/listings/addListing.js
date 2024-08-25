import { headers } from "../authorization/headers.js";
import { listingsUrl } from "../../constants/api.js";

export async function addListing(listingData) {
  if (!listingData || Object.keys(listingData).length === 0) {
    throw new Error("Listing data cannot be empty");
  }

  const options = {
    method: "POST",
    headers: headers(true), // Ensure Content-Type is set to application/json
    body: JSON.stringify(listingData),
  };

  const response = await fetch(listingsUrl, options);
  const results = await response.json();

  if (!response.ok) {
    throw new Error(results.errors[0].message || "Failed to create listing.");
  }

  return results;
}
