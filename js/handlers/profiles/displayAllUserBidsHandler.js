import { getAllUserBids } from "../../api/profiles/getAllUserBids.js";

export async function displayAllUserBidsHandler(userName = null) {
  const bidsContainer = "#bidHistory";

  try {
    // If userName is not provided, get it from local storage or another source
    if (!userName) {
      const { getUserName } = await import("../../utils/helpers/getUserName.js");
      userName = getUserName();
    }

    const bids = await getAllUserBids(userName);

    if (bids.length === 0) {
      document.querySelector(bidsContainer).innerHTML += '<p class="text-muted">No bids to display yet.</p>';
      return;
    }

    // Create the "Bid History" button to toggle the dropdown
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("btn", "btn-link", "p-0", "mb-3", "fs-5", "montserrat");
    toggleButton.setAttribute("data-bs-toggle", "collapse");
    toggleButton.setAttribute("data-bs-target", "#bidsCollapse");
    toggleButton.setAttribute("aria-expanded", "false");
    toggleButton.setAttribute("aria-controls", "bidsCollapse");
    toggleButton.textContent = "Bid History";
    toggleButton.style.textDecoration = "none";

    // Create the collapsible list
    const bidsListCollapse = document.createElement("div");
    bidsListCollapse.classList.add("collapse");
    bidsListCollapse.id = "bidsCollapse";

    const bidsList = document.createElement("ul");
    bidsList.classList.add("list-group");

    bids.forEach((bid) => {
      const bidItem = document.createElement("li");
      bidItem.classList.add("list-group-item", "mb-3");

      // Make the listing title clickable
      const listingLink = document.createElement("a");
      listingLink.href = `/listing/listing.html?id=${bid.listing?.id}`;
      listingLink.textContent = bid.listing?.title ?? "Unknown listing";
      listingLink.classList.add("text-decoration-none", "montserrat");

      bidItem.innerHTML = `
        <p><strong>Listing: </strong> </p>
        <p><strong>Bid Amount:</strong> ${bid.amount}</p>
        <p><strong>Date:</strong> ${new Date(bid.created).toLocaleString()}</p>
      `;

      // Insert the clickable title
      bidItem.querySelector("p strong").appendChild(listingLink);

      bidsList.appendChild(bidItem);
    });

    // Append the list to the collapsible container
    bidsListCollapse.appendChild(bidsList);

    // Clear any existing content and append the toggle button and list
    const containerElement = document.querySelector(bidsContainer);
    containerElement.innerHTML = "";
    containerElement.appendChild(toggleButton);
    containerElement.appendChild(bidsListCollapse);
  } catch (error) {
    document.querySelector(bidsContainer).innerHTML += "<p>Failed to load bid history.</p>";
    console.error("Error displaying user bids:", error);
  }
}

// import { getAllUserBids } from "../../api/profiles/getAllUserBids.js";
// import { getUserName } from "../../utils/helpers/getUserName.js";

// export async function displayAllUserBidsHandler() {
//   const userName = getUserName();
//   const bidsContainer = "#bidHistory";

//   try {
//     const bids = await getAllUserBids(userName);

//     if (bids.length === 0) {
//       document.querySelector(bidsContainer).innerHTML += '<p class="text-muted">No bids to display yet.</p>';
//       return;
//     }

//     // Create the "Bid History" button to toggle the dropdown
//     const toggleButton = document.createElement("button");
//     toggleButton.classList.add("btn", "btn-link", "p-0", "mb-3", "fs-5");
//     toggleButton.setAttribute("data-bs-toggle", "collapse");
//     toggleButton.setAttribute("data-bs-target", "#bidsCollapse");
//     toggleButton.setAttribute("aria-expanded", "false");
//     toggleButton.setAttribute("aria-controls", "bidsCollapse");
//     toggleButton.textContent = "Bid History";
//     toggleButton.style.textDecoration = "none";

//     // Create the collapsible list
//     const bidsListCollapse = document.createElement("div");
//     bidsListCollapse.classList.add("collapse");
//     bidsListCollapse.id = "bidsCollapse";

//     const bidsList = document.createElement("ul");
//     bidsList.classList.add("list-group");

//     bids.forEach((bid) => {
//       const bidItem = document.createElement("li");
//       bidItem.classList.add("list-group-item", "mb-3");

//       // Make the listing title clickable
//       const listingLink = document.createElement("a");
//       listingLink.href = `/listing/listing.html?id=${bid.listing?.id}`;
//       listingLink.textContent = bid.listing?.title ?? "Unknown listing";
//       listingLink.classList.add("text-decoration-none");

//       bidItem.innerHTML = `
//         <p><strong>Listing: </strong> </p>
//         <p><strong>Bid Amount:</strong> ${bid.amount}</p>
//         <p><strong>Date:</strong> ${new Date(bid.created).toLocaleString()}</p>
//       `;

//       // Insert the clickable title
//       bidItem.querySelector("p strong").appendChild(listingLink);

//       bidsList.appendChild(bidItem);
//     });

//     // Append the list to the collapsible container
//     bidsListCollapse.appendChild(bidsList);

//     // Clear any existing content and append the toggle button and list
//     const containerElement = document.querySelector(bidsContainer);
//     containerElement.innerHTML = "";
//     containerElement.appendChild(toggleButton);
//     containerElement.appendChild(bidsListCollapse);
//   } catch (error) {
//     document.querySelector(bidsContainer).innerHTML += "<p>Failed to load bid history.</p>";
//     console.error("Error displaying user bids:", error);
//   }
// }
