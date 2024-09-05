import { getSingleListing } from "../../api/listings/getSingleListing.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { getParams } from "../../utils/helpers/getParams.js";
import { editListing } from "../../api/listings/editListing.js";

export async function editListingHandler() {
  if (window.location.pathname !== "/profile/edit-listing.html") {
    return;
  }

  const id = getParams("id");

  if (!id) {
    throw new Error("Sorry, we couldn't find the listing you're looking for.");
  }

  if (id) {
    try {
      const listing = await getSingleListing(id);
      populateForm(listing.data);
    } catch (error) {
      console.log(error);
      messageForUser("#messageForUser", "danger", "Sorry, we couldn't load the editing form.");
    }
  }
}

document.addEventListener("DOMContentLoaded", editListingHandler);

function populateForm(listing) {
  const form = document.querySelector("#editListingForm");

  // Populate form fields with listing data
  document.getElementById("listingTitle").value = listing.title || "";
  document.getElementById("listingDescription").value = listing.description || "";
  document.getElementById("listingEndsAt").value = new Date(listing.endsAt).toISOString().slice(0, -8);

  const mediaContainer = document.getElementById("mediaInputsContainer");
  mediaContainer.innerHTML = "";

  listing.media.forEach((media) => {
    const mediaUrlDiv = document.createElement("div");
    mediaUrlDiv.classList.add("w-100", "mb-3");

    const mediaUrlInput = document.createElement("input");
    mediaUrlInput.type = "url";
    mediaUrlInput.name = "media-url";
    mediaUrlInput.classList.add("form-control", "border-1", "border-primary", "form-input");
    mediaUrlInput.value = media.url;
    mediaUrlInput.placeholder = "Media URL";

    const mediaAltDiv = document.createElement("div");
    mediaAltDiv.classList.add("w-100", "mb-3");

    const mediaAltInput = document.createElement("input");
    mediaAltInput.type = "text";
    mediaAltInput.name = "media-alt";
    mediaAltInput.classList.add("form-control", "border-1", "border-primary", "form-input");
    mediaAltInput.value = media.alt;
    mediaAltInput.placeholder = "Media Alt Text";

    mediaUrlDiv.appendChild(mediaUrlInput);
    mediaAltDiv.appendChild(mediaAltInput);
    mediaContainer.appendChild(mediaUrlDiv);
    mediaContainer.appendChild(mediaAltDiv);
  });

  // Add submit event listener to handle listing edit
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.querySelector("#listingTitle").value.trim();
    const description = document.querySelector("#listingDescription").value.trim();
    const endsAt = new Date(document.querySelector("#listingEndsAt").value).toISOString();

    // Gather all media URLs and alt texts
    const mediaUrls = Array.from(document.querySelectorAll("input[name='media-url']"));
    const mediaAlts = Array.from(document.querySelectorAll("input[name='media-alt']"));
    const media = mediaUrls
      .map((input, index) => ({
        url: input.value.trim(),
        alt: mediaAlts[index]?.value.trim() || "Listing image",
      }))
      .filter((item) => item.url);

    const listingData = {
      title: title || "Untitled Listing",
      description: description || "",
      endsAt: endsAt,
      media: media,
    };

    try {
      await editListing(listing.id, listingData);
      messageForUser("#messageForUser", "success", "Listing updated successfully.");
      window.location.href = `/listing/listing.html?id=${listing.id}`;
    } catch (error) {
      console.error(error);
      messageForUser("#messageForUser", "danger", "Failed to update listing.");
    }
  });
}
