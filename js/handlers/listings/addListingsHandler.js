import { addListing } from "../../api/listings/addListing.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { renderAddedListing } from "../../ui/renderAddedListing.js";

export function addListingHandler() {
  const newListingButton = document.getElementById("newListingsButton");
  const newListingModal = new bootstrap.Modal(document.getElementById("newListingModal"));
  const mediaInputsContainer = document.getElementById("mediaInputsContainer");
  const addImageFieldButton = document.getElementById("addImageField");

  if (newListingButton) {
    newListingButton.addEventListener("click", function () {
      newListingModal.show();
    });
  }

  // Handle adding more image fields
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

  const newListingForm = document.querySelector("#newListingForm");
  if (newListingForm) {
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
        .filter((item) => item.url); // Filter out empty URLs

      const listingData = {
        title: title || "Untitled Listing",
        description: description || "",
        endsAt: endsAt,
        media: media,
      };

      try {
        const results = await addListing(listingData);
        messageForUser("#messageForUser", "success", "Listing created successfully.");
        renderAddedListing("#profileContainer", results.data);
        newListingModal.hide();
        newListingForm.reset();
        mediaInputsContainer.innerHTML = ""; // Clear added image fields
      } catch (error) {
        console.error(error);
        messageForUser("#messageForUser", "danger", "Failed to create listing.");
      }
    });
  }
}

// export function addListingHandler() {
//   const newListingForm = document.querySelector("#newListingForm");

//   if (newListingForm) {
//     newListingForm.addEventListener("submit", async (event) => {
//       event.preventDefault();

//       const title = document.querySelector("#listingTitle").value.trim();
//       const description = document.querySelector("#listingDescription").value.trim();
//       const endsAt = new Date(document.querySelector("#listingEndsAt").value).toISOString();
//       const mediaUrl = document.querySelector("#listingMediaUrl").value.trim();
//       const mediaAlt = document.querySelector("#listingMediaAlt").value.trim();

//       const listingData = {
//         title: title || "Untitled Listing",
//         description: description || "",
//         endsAt: endsAt,
//         media: mediaUrl ? [{ url: mediaUrl, alt: mediaAlt || "Listing image" }] : [],
//       };

//       try {
//         const results = await addListing(listingData);
//         messageForUser("#messageForUser", "success", "Listing created successfully.");

//         // Render the newly added listing (optional)
//         renderAddedListing("#profileContainer", results.data);

//         // Close the modal
//         const newListingModal = bootstrap.Modal.getInstance(document.getElementById("newListingModal"));
//         newListingModal.hide();

//         // Optionally, reset the form
//         newListingForm.reset();
//       } catch (error) {
//         console.error(error);
//         messageForUser("#messageForUser", "danger", "Failed to create listing.");
//       }
//     });
//   }
// }

// export function addListingHandler() {
//   // Attach event listener to the button by ID
//   const newListingButton = document.getElementById("newListingsButton");
//   const newListingModal = new bootstrap.Modal(document.getElementById("newListingModal"));

//   if (newListingButton) {
//     newListingButton.addEventListener("click", function () {
//       // Show the modal when the button is clicked
//       newListingModal.show();
//     });
//   }

//   const newListingForm = document.querySelector("#newListingForm");
//   if (newListingForm) {
//     newListingForm.addEventListener("submit", async (event) => {
//       event.preventDefault();

//       // Gather form data
//       const title = document.querySelector("#listingTitle").value.trim();
//       const description = document.querySelector("#listingDescription").value.trim();
//       const endsAt = new Date(document.querySelector("#listingEndsAt").value).toISOString();
//       const mediaUrl = document.querySelector("#listingMediaUrl").value.trim();
//       const mediaAlt = document.querySelector("#listingMediaAlt").value.trim();

//       // Create listing data object
//       const listingData = {
//         title: title || "Untitled Listing",
//         description: description || "",
//         endsAt: endsAt,
//         media: mediaUrl ? [{ url: mediaUrl, alt: mediaAlt || "Listing image" }] : [],
//       };

//       try {
//         // Send the data to the API
//         const results = await addListing(listingData);
//         messageForUser("#messageForUser", "success", "Listing created successfully.");

//         // Render the newly added listing (optional)
//         renderAddedListing("#profileContainer", results.data);

//         // Close the modal after submission
//         newListingModal.hide();

//         // Optionally reset the form
//         newListingForm.reset();
//       } catch (error) {
//         console.error(error);
//         messageForUser("#messageForUser", "danger", "Failed to create listing.");
//       }
//     });
//   }
// }
