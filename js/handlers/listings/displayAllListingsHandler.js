import { getAllListings } from "../../api/listings/getAllListings.js";
import { renderAllListings } from "../../ui/renderAllListings.js";
import { messageForUser } from "../../ui/messageForUser.js";

export async function displayAllListingsHandler() {
  try {
    const response = await getAllListings();
    const listings = response.data;

    console.log(listings);

    renderAllListings("#listings", listings);
  } catch (error) {
    console.log(error);
    messageForUser("#listings", "danger", error.message);
  }
}
