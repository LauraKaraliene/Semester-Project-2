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

      // Check if the user is on the index page
      if (window.location.pathname !== "/index.html" && window.location.pathname !== "/") {
        // Redirect to index page with the search query as a parameter
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

// export function searchListingsHandler() {
//   const searchForm = document.querySelector("#searchForm");
//   if (searchForm) {
//     searchForm.addEventListener("submit", async (event) => {
//       event.preventDefault();

//       const searchInputElement = document.querySelector("#search");
//       const searchInput = searchInputElement.value.trim();

//       if (searchInput === "") {
//         messageForUser(
//           "#messageForUser",
//           "warning",
//           "Please type something into the search box to find what you're looking for."
//         );
//         return;
//       }

//       try {
//         const listings = await searchListings(searchInput);
//         console.log("Listings retrieved:", listings);

//         renderAllListings("#listings", listings);
//         console.log("Listings rendered successfully.");
//       } catch (error) {
//         console.error("Search failed:", error);
//         messageForUser("#messageForUser", "danger", error.message);
//       } finally {
//         searchInputElement.value = "";
//         console.log("Clearing search field");
//       }
//     });
//   }
// }
