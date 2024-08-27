import { deleteListing } from "../../api/listings/deleteListing.js";
import { messageForUser } from "../../ui/messageForUser.js";

export function deleteListingHandler() {
  const deleteButtons = document.querySelectorAll(`[data-action="delete"]`);
  deleteButtons.forEach((button) => {
    button.addEventListener("click", handleDeleteListing);
  });
}

async function handleDeleteListing(event) {
  const { id } = event.target.dataset;

  const shouldYouDelete = confirm("Are you sure you want to delete this listing?");
  if (shouldYouDelete) {
    try {
      await deleteListing(id);
      messageForUser("#listing", "success", "Listing deleted successfully");

      setTimeout(() => {
        window.location.href = "/profile/";
      }, 3000);
    } catch (error) {
      console.error("Error deleting listing:", error);
      messageForUser("#listing", "danger", "Failed to delete listing.");
    }
  }
}
