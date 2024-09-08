import { getAllListings } from "../../api/listings/getAllListings.js";
import { renderAllListings } from "../../ui/renderAllListings.js";
import { messageForUser } from "../../ui/messageForUser.js";

export async function displayAllListingsHandler(basePath = "") {
  try {
    const response = await getAllListings();
    const listings = response.data;

    renderAllListings("#listings", listings, basePath);
  } catch (error) {
    console.log(error);
    messageForUser("#listings", "danger", error.message);
  }
}
