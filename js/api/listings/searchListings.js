import { searchUrl } from "../../constants/api.js";

export async function searchListings(query) {
  console.log("Searching for:", query);
  const searchUrlWithQuery = `${searchUrl}?q=${encodeURIComponent(query)}`;
  console.log("Search URL:", searchUrlWithQuery);

  const response = await fetch(searchUrlWithQuery);
  const json = await response.json();

  if (response.ok) {
    const listings = json.data ?? [];

    if (listings.length === 0) {
      console.error("No listings found with the provided query.");
      throw new Error("No listings found with the provided input.");
    }

    console.log("Search results:", listings);
    return listings;
  } else {
    console.error("Error in searchListings:", json.message);
    throw new Error(json.message || "An error occurred while searching for listings.");
  }
}

// export async function searchListings(query) {
//   console.log("Searching for:", query);
//   const searchUrlWithQuery = `${searchUrl}?q=${encodeURIComponent(query)}`;
//   console.log("Search URL:", searchUrlWithQuery);

//   const response = await fetch(searchUrlWithQuery);
//   const json = await response.json();

//   if (response.ok) {
//     console.log("Search results:", json);
//     // Assuming the listings are wrapped in a `data` property
//     const listings = json.data ?? json; // Adjust this based on your API response

//     if (!Array.isArray(listings) || listings.length === 0) {
//       throw new Error("No listings found with the provided query.");
//     }
//     return listings;
//   } else {
//     console.error("Error in searchListings:", json.message);
//     throw new Error(json.message || "An error occurred while searching for listings.");
//   }
// }
