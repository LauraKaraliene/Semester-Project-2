import { listingsUrl } from "../../constants/api.js";
import { headers } from "../authorization/headers.js";

export async function getAllListings() {
  const options = {
    headers: headers(),
  };

  const response = await fetch(listingsUrl, options);
  const results = await response.json();

  if (!response.ok) {
    console.error("Error fetching listings:", results.errors[0].message);
    throw new Error(results.errors[0].message);
  }
  return results;
}
