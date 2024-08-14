import { listingsUrl } from "../../constants/api.js";
import { headers } from "../authorization/headers.js";

export async function getAllListings() {
  console.log("Fetching from URL:", listingsUrl);

  const options = {
    headers: headers(),
  };

  const response = await fetch(listingsUrl, options);

  console.log("Response status:", response.status);

  const results = await response.json();

  if (!response.ok) {
    console.error("Error fetching listings:", results.errors[0].message);
    throw new Error(results.errors[0].message);
  }

  console.log("Fetched listings data:", results);
  return results;
}
