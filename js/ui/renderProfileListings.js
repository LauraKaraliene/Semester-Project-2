export function renderListings(listings) {
  const listingsContainer = document.querySelector(".profile-listings");
  listingsContainer.innerHTML = "";

  if (listings.length === 0) {
    listingsContainer.innerHTML = "<p>No auctions to display yet.</p>";
    return;
  }

  listings.forEach((listing) => {
    const listingElement = document.createElement("div");
    listingElement.className = "listing";
    listingElement.innerHTML = `
            <h5>${listing.title}</h5>
            <p>${listing.description}</p>
        `;
    listingsContainer.appendChild(listingElement);
  });
}
