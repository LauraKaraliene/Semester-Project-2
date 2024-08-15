import { listingsUrl } from "../../constants/api.js";
import { headers } from "../authorization/headers.js";

export async function getSingleListing(id) {
  // console.log(`Fetching: ${listingsUrl}/${id}`);
  const options = {
    headers: headers(),
  };

  const response = await fetch(`${listingsUrl}/${id}`, options);
  console.log("Response status:", response.status);
  const results = await response.json();

  if (!response.ok) {
    console.error("Error fetching listings:", results.errors[0].message);
    throw new Error(results.errors[0].message);
  }
  console.log("Fetched listings data:", results);
  return results;
}

// export async function getSingleListing(id) {
//   const response = await fetch(`${listingsUrl}/${id}`, {
//     method: "GET",
//     headers: headers(),
//   });

//   if (!response.ok) {
//     throw new Error(`Error: ${response.status} ${response.statusText}`);
//   }

//   return await response.json();
// }
