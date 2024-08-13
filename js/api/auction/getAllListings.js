import { listingsUrl } from "../../constants/api.js";
// import { getToken } from "../../utils/helpers/getToken.js";
// import { apiKey } from "../../constants/api.js";
import { headers } from "../authorization/headers.js";

export async function getAllListings() {
  //   const token = getToken();
  const options = {
    headers: headers(),
  };

  const response = await fetch(listingsUrl, options);
  const results = await response.json();

  if (!response.ok) {
    throw new Error(results.errors[0].message);
  }
  return results;
}
