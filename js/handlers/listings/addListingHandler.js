import { addListing } from "../../api/listings/addListing.js";
import { messageForUser } from "../../ui/messageForUser.js";

export function addListingHandler() {
  const mediaInputsContainer = document.getElementById("mediaInputsContainer");
  const addImageFieldButton = document.getElementById("addImageField");
  const newListingForm = document.getElementById("newListingForm");

  if (addImageFieldButton) {
    // Check if the addImageFieldButton exists
    addImageFieldButton.addEventListener("click", function () {
      const mediaUrlDiv = document.createElement("div");
      mediaUrlDiv.classList.add("w-100", "mb-3");

      const mediaUrlInput = document.createElement("input");
      mediaUrlInput.type = "url";
      mediaUrlInput.name = "media-url";
      mediaUrlInput.classList.add("form-control", "border-1", "border-primary", "form-input");
      mediaUrlInput.placeholder = "Media URL";

      const mediaAltDiv = document.createElement("div");
      mediaAltDiv.classList.add("w-100", "mb-3");

      const mediaAltInput = document.createElement("input");
      mediaAltInput.type = "text";
      mediaAltInput.name = "media-alt";
      mediaAltInput.classList.add("form-control", "border-1", "border-primary", "form-input");
      mediaAltInput.placeholder = "Media Alt Text";

      mediaUrlDiv.appendChild(mediaUrlInput);
      mediaAltDiv.appendChild(mediaAltInput);
      mediaInputsContainer.appendChild(mediaUrlDiv);
      mediaInputsContainer.appendChild(mediaAltDiv);
    });
  } else {
    console.warn("addImageFieldButton element not found on this page.");
  }

  if (newListingForm) {
    // Check if the newListingForm exists
    newListingForm.addEventListener("submit", async (event) => {
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
        const results = await addListing(listingData);
        messageForUser("#messageForUser", "success", "Listing created successfully.");
        window.location.href = "/profile/";
      } catch (error) {
        console.error(error);
        messageForUser("#messageForUser", "danger", "Failed to create listing.");
      }
    });
  } else {
    console.warn("newListingForm element not found on this page.");
  }
}
