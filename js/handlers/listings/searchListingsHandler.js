import { searchListings } from "../../api/listings/searchListings.js";
import { renderAllListings } from "../../ui/renderAllListings.js";
import { messageForUser } from "../../ui/messageForUser.js";

export function searchListingsHandler() {
  const searchForm = document.querySelector("#searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const searchInputElement = document.querySelector("#search");
      const searchInput = searchInputElement.value.trim();

      if (searchInput === "") {
        messageForUser(
          "#messageForUser",
          "warning",
          "Please type something into the search box to find what you're looking for."
        );
        return;
      }

      if (window.location.pathname !== "/index.html" && window.location.pathname !== "/") {
        window.location.href = `/index.html?search=${encodeURIComponent(searchInput)}`;
        return;
      }

      try {
        const listings = await searchListings(searchInput);
        renderAllListings("#listings", listings);
      } catch (error) {
        console.error("Search failed:", error);
        messageForUser("#messageForUser", "danger", error.message);
      } finally {
        searchInputElement.value = "";
      }
    });
  }
}
