import { getSingleListing } from "../../api/listings/getSingleListing.js";
import { renderSingleListing } from "../../ui/renderSingleListing.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { getParams } from "../../utils/helpers/getParams.js";

export async function displaySingleListingHandler() {
  try {
    const id = getParams("id");
    console.log("ID:", id);

    if (!id) {
      throw new Error("Sorry, we couldn't find the listing you're looking for.");
    }

    // const response = await getSingleListing(id);
    // console.log("Response:", response);
    // const listing = response.data;

    const listing = await getSingleListing(id);

    console.log(listing);

    if (listing) {
      document.title = `BidNest | ${listing.title}`;
      renderSingleListing("#listing", listing);
    }
  } catch (error) {
    console.log(error);
    messageForUser("#listing", "danger", error.message);
  }
}
