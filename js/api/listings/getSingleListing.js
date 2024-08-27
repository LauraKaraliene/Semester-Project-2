import { listingsUrl } from "../../constants/api.js";
import { headers } from "../authorization/headers.js";

export async function getSingleListing(id) {
  const options = {
    headers: headers(),
  };

  const response = await fetch(`${listingsUrl}/${id}?_seller=true&_bids=true`, options);
  console.log("Response status:", response.status);
  const results = await response.json();

  if (!response.ok) {
    console.error("Error fetching listings:", results.errors[0].message);
    throw new Error(results.errors[0].message);
  }
  console.log("Fetched listings data:", results);
  return results;
}
