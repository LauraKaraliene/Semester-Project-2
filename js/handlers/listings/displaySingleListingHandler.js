import { getSingleListing } from "../../api/listings/getSingleListing.js";
import { renderSingleListing } from "../../ui/renderSingleListing.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { getParams } from "../../utils/helpers/getParams.js";

export async function displaySingleListingHandler() {
  try {
    const id = getParams("id");

    if (!id) {
      throw new Error("Sorry, we couldn't find the listing you're looking for.");
    }

    const listing = await getSingleListing(id);
    console.log("Fetched listing:", listing);

    if (listing) {
      document.title = `BidNest | ${listing.title}`;
      renderSingleListing("#listing", listing);
    }
  } catch (error) {
    console.log(error);
    messageForUser("#listing", "danger", error.message);
  }
}
