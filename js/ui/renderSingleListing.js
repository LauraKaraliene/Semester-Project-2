import { startCountdown } from "./startCountdown.js";
import { getUserName } from "../utils/helpers/getUserName.js";
import { deleteListing } from "../api/listings/deleteListing.js";
import { placeBid } from "../api/listings/placeBid.js";
import { messageForUser } from "./messageForUser.js";

export function renderSingleListing(parent, listing) {
  const container = document.querySelector(parent);
  container.innerHTML = "";

  const { title, description, media, endsAt, _count = {}, seller, bids } = listing.data;
  const highestBid = bids.reduce((max, bid) => (bid.amount > max ? bid.amount : max), 0);
  const currentUser = getUserName(); // Get the logged-in user's name

  console.log("Current User:", currentUser);
  console.log("Listing Seller:", seller.name);

  // Main container
  const wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("d-flex", "col-md-10", "mx-auto", "gap-5");

  // Image section
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("col-md-5");

  let mainImg = null;

  if (media && media.length > 0) {
    mainImg = document.createElement("img");
    mainImg.src = media[0].url;
    mainImg.alt = media[0].alt || "Listing image";
    mainImg.classList.add("img-fluid", "rounded", "shadow-sm", "mb-2");
    imageDiv.appendChild(mainImg);

    const smallerImagesDiv = document.createElement("div");
    smallerImagesDiv.classList.add("d-flex", "gap-2", "flex-wrap");

    media.slice(1, 4).forEach((item) => {
      const imgWrapper = document.createElement("div");
      imgWrapper.style.width = "32%"; // Each image takes up 32% of the width
      imgWrapper.classList.add("cursor-pointer");

      const img = document.createElement("img");
      img.src = item.url;
      img.alt = item.alt || "Listing image";
      img.classList.add("img-fluid", "rounded", "shadow-sm", "cursor-pointer");
      img.style.objectFit = "cover";
      img.style.width = "100%";
      img.style.height = "100px";

      imgWrapper.addEventListener("click", () => {
        mainImg.src = item.url;
        mainImg.alt = item.alt || "Listing image";
      });

      imgWrapper.appendChild(img);
      smallerImagesDiv.appendChild(imgWrapper);
    });

    imageDiv.appendChild(smallerImagesDiv);
  } else {
    const img = document.createElement("img");
    img.src = "../images/placeholder.png";
    img.alt = "Placeholder image";
    img.classList.add("img-fluid", "rounded", "shadow-sm");
    imageDiv.appendChild(img);
  }

  // Details section
  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("col-md-5", "d-flex", "flex-column");

  const titleElement = document.createElement("h1");
  titleElement.classList.add("fw-bold", "mb-3");
  titleElement.textContent = title ?? "No title";

  const countdownElement = document.createElement("p");
  countdownElement.classList.add("fs-6", "mb-2");
  countdownElement.innerHTML = `<strong>Ends in:</strong> <span id="countdown"></span>`;
  detailsDiv.append(titleElement, countdownElement);

  if (description) {
    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("fs-6", "mb-2");
    descriptionElement.innerHTML = `<strong>Description:</strong> ${description}`;
    detailsDiv.appendChild(descriptionElement);
  }

  const highestBidElement = document.createElement("p");
  highestBidElement.classList.add("mb-2", "fs-6");
  highestBidElement.innerHTML = `<strong>Highest bid:</strong> ${highestBid || "No bids yet"}`;
  detailsDiv.appendChild(highestBidElement);

  const bidHistoryDiv = document.createElement("div");
  const bidHistoryCollapseBtn = document.createElement("button");
  bidHistoryCollapseBtn.classList.add("btn", "btn-link", "p-0", "mb-2", "fs-6");
  bidHistoryCollapseBtn.setAttribute("data-bs-toggle", "collapse");
  bidHistoryCollapseBtn.setAttribute("data-bs-target", "#bidHistoryList");
  bidHistoryCollapseBtn.textContent = "View Bid History";
  bidHistoryCollapseBtn.style.textDecoration = "none";

  const bidHistoryList = document.createElement("ul");
  bidHistoryList.classList.add("list-group", "collapse");
  bidHistoryList.id = "bidHistoryList";

  if (bids && bids.length > 0) {
    bids.forEach((bid) => {
      const bidHistoryItem = document.createElement("li");
      bidHistoryItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
      bidHistoryItem.innerHTML = `${bid.amount} <span class="text-muted">${bid.bidder.name} - ${new Date(
        bid.created
      ).toLocaleDateString()}</span>`;
      bidHistoryList.append(bidHistoryItem);
    });
  } else {
    const noBidsItem = document.createElement("li");
    noBidsItem.classList.add("list-group-item", "text-muted");
    noBidsItem.textContent = "No bids yet.";
    bidHistoryList.append(noBidsItem);
  }

  bidHistoryDiv.append(bidHistoryCollapseBtn, bidHistoryList);
  detailsDiv.appendChild(bidHistoryDiv);

  //seller information
  const sellerDiv = document.createElement("div");
  sellerDiv.classList.add("mt-1", "d-flex", "align-items-center");

  const sellerTitle = document.createElement("p");
  sellerTitle.classList.add("fw-bold", "me-3", "fs-6", "mb-0");
  sellerTitle.textContent = "Seller:";

  const sellerInfo = document.createElement("div");

  const sellerLink = document.createElement("a");
  sellerLink.href = "#";
  sellerLink.textContent = seller?.name ?? "UserName";
  sellerLink.classList.add("text-decoration-none", "mb-0", "p-0");

  sellerInfo.appendChild(sellerLink);
  sellerDiv.append(sellerTitle, sellerInfo);
  detailsDiv.appendChild(sellerDiv);

  if (seller.name === currentUser) {
    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("dropdown");

    const optionsButton = document.createElement("button");
    optionsButton.classList.add("btn", "btn-link", "p-0", "mt-3", "px-2", "py-1");
    optionsButton.setAttribute("id", "dropdownMenuButton");
    optionsButton.setAttribute("data-bs-toggle", "dropdown");
    optionsButton.setAttribute("aria-expanded", "false");
    optionsButton.style.textDecoration = "none";
    optionsButton.style.border = "1px solid var(--bs-primary)";
    optionsButton.innerHTML = `<span>Options</span><i class="bi bi-three-dots-vertical"></i>`;

    const optionsMenu = document.createElement("ul");
    optionsMenu.classList.add("dropdown-menu");
    optionsMenu.setAttribute("aria-labelledby", "dropdownMenuButton");

    const editOption = document.createElement("li");
    editOption.innerHTML = `<a class="dropdown-item" href="/profile/edit-listing.html?id=${listing.data.id}">Edit</a>`;

    const deleteOption = document.createElement("li");
    deleteOption.innerHTML = `<a class="dropdown-item text-danger" href="#" data-action="delete" data-id="${listing.data.id}">Delete</a>`;

    optionsMenu.append(editOption, deleteOption);
    optionsDiv.append(optionsButton, optionsMenu);
    detailsDiv.appendChild(optionsDiv);

    deleteOption.querySelector("a").addEventListener("click", async (event) => {
      event.preventDefault();

      const shouldYouDelete = confirm("Are you sure you want to delete this listing?");
      if (shouldYouDelete) {
        try {
          await deleteListing(listing.data.id);
          messageForUser("#messageForUser", "success", "Listing deleted successfully.");

          setTimeout(() => {
            window.location.href = "/profile/";
          }, 3000);
        } catch (error) {
          console.error("Error deleting listing:", error);
          messageForUser("#messageForUser", "danger", "Failed to delete listing.");
        }
      }
    });
  } else {
    const bidInputDiv = document.createElement("div");
    bidInputDiv.classList.add("mb-3");

    const bidInputLabel = document.createElement("label");
    bidInputLabel.classList.add("form-label");
    const bidInput = document.createElement("input");
    bidInput.type = "number";
    bidInput.classList.add("form-control");
    bidInput.placeholder = "Enter your bid";
    bidInput.id = "placeYourBidInput";

    bidInputDiv.append(bidInputLabel, bidInput);
    detailsDiv.appendChild(bidInputDiv);

    const bidButton = document.createElement("button");
    bidButton.classList.add("btn", "btn-primary", "text-white", "mt-1", "w-100");
    bidButton.textContent = "Place Bid";

    bidButton.addEventListener("click", async (event) => {
      event.preventDefault();

      const bidAmount = parseFloat(bidInput.value);

      if (bidAmount && bidAmount > 0) {
        try {
          await placeBid(listing.data.id, bidAmount); // Pass bidAmount directly
          messageForUser("#messageForUser", "success", "Bid placed successfully.", 3000, bidButton); // Adjust this to the right place

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (error) {
          console.error("Error placing bid:", error);
          messageForUser("#messageForUser", "danger", "Failed to place bid.", 3000, bidButton); // Adjust this to the right place
        }
      } else {
        alert("Please enter a valid bid amount.");
      }
    });

    detailsDiv.appendChild(bidButton);
  }

  wrapperDiv.append(imageDiv, detailsDiv);
  container.append(wrapperDiv);

  startCountdown(endsAt, document.getElementById("countdown"));
}

// import { startCountdown } from "./startCountdown.js";
// import { getUserName } from "../utils/helpers/getUserName.js";
// import { deleteListing } from "../api/listings/deleteListing.js";
// import { placeBidHandler } from "../handlers/listings/placeBidHandler.js";
// import { messageForUser } from "./messageForUser.js";

// export function renderSingleListing(parent, listing) {
//   const container = document.querySelector(parent);
//   container.innerHTML = "";

//   const { title, description, media, endsAt, _count = {}, seller, bids } = listing.data;
//   const highestBid = bids.reduce((max, bid) => (bid.amount > max ? bid.amount : max), 0);
//   const currentUser = getUserName(); // Get the logged-in user's name

//   console.log("Current User:", currentUser); // Debugging current user
//   console.log("Listing Seller:", seller.name);

//   // Main container
//   const wrapperDiv = document.createElement("div");
//   wrapperDiv.classList.add("d-flex", "col-md-10", "mx-auto", "gap-5");

//   // Image section
//   const imageDiv = document.createElement("div");
//   imageDiv.classList.add("col-md-5");

//   let mainImg = null;

//   if (media && media.length > 0) {
//     mainImg = document.createElement("img");
//     mainImg.src = media[0].url;
//     mainImg.alt = media[0].alt || "Listing image";
//     mainImg.classList.add("img-fluid", "rounded", "shadow-sm", "mb-2");
//     imageDiv.appendChild(mainImg);

//     const smallerImagesDiv = document.createElement("div");
//     smallerImagesDiv.classList.add("d-flex", "gap-2", "flex-wrap");

//     media.slice(1, 4).forEach((item) => {
//       const imgWrapper = document.createElement("div");
//       imgWrapper.style.width = "32%"; // Each image takes up 32% of the width
//       imgWrapper.classList.add("cursor-pointer");

//       const img = document.createElement("img");
//       img.src = item.url;
//       img.alt = item.alt || "Listing image";
//       img.classList.add("img-fluid", "rounded", "shadow-sm", "cursor-pointer");
//       img.style.objectFit = "cover";
//       img.style.width = "100%";
//       img.style.height = "100px";

//       imgWrapper.addEventListener("click", () => {
//         mainImg.src = item.url;
//         mainImg.alt = item.alt || "Listing image";
//       });

//       imgWrapper.appendChild(img);
//       smallerImagesDiv.appendChild(imgWrapper);
//     });

//     imageDiv.appendChild(smallerImagesDiv);
//   } else {
//     const img = document.createElement("img");
//     img.src = "../images/placeholder.png";
//     img.alt = "Placeholder image";
//     img.classList.add("img-fluid", "rounded", "shadow-sm");
//     imageDiv.appendChild(img);
//   }

//   // Details section
//   const detailsDiv = document.createElement("div");
//   detailsDiv.classList.add("col-md-5", "d-flex", "flex-column");

//   const titleElement = document.createElement("h1");
//   titleElement.classList.add("fw-bold", "mb-3");
//   titleElement.textContent = title ?? "No title";

//   const countdownElement = document.createElement("p");
//   countdownElement.classList.add("text-muted", "fs-6", "mb-2");
//   countdownElement.innerHTML = `<strong>Ends in:</strong> <span id="countdown"></span>`;
//   detailsDiv.append(titleElement, countdownElement);

//   // Description section (placed under "Ends in" and above "Highest bid")
//   if (description) {
//     const descriptionElement = document.createElement("p");
//     descriptionElement.classList.add("text-muted", "fs-6", "mb-2");
//     descriptionElement.innerHTML = `<strong>Description:</strong> ${description}`;
//     detailsDiv.appendChild(descriptionElement);
//   }

//   // Highest Bid
//   const highestBidElement = document.createElement("p");
//   highestBidElement.classList.add("text-muted", "mb-2", "fs-6");
//   highestBidElement.innerHTML = `<strong>Highest bid:</strong> ${highestBid || "No bids yet"}`;
//   detailsDiv.appendChild(highestBidElement);

//   // Bid History Section with Collapse
//   const bidHistoryDiv = document.createElement("div");
//   const bidHistoryCollapseBtn = document.createElement("button");
//   bidHistoryCollapseBtn.classList.add("btn", "btn-link", "p-0", "mb-2", "fs-6");
//   bidHistoryCollapseBtn.setAttribute("data-bs-toggle", "collapse");
//   bidHistoryCollapseBtn.setAttribute("data-bs-target", "#bidHistoryList");
//   bidHistoryCollapseBtn.textContent = "View Bid History";
//   bidHistoryCollapseBtn.style.textDecoration = "none";

//   const bidHistoryList = document.createElement("ul");
//   bidHistoryList.classList.add("list-group", "collapse");
//   bidHistoryList.id = "bidHistoryList";

//   // Loop through bids and display them
//   if (bids && bids.length > 0) {
//     bids.forEach((bid) => {
//       const bidHistoryItem = document.createElement("li");
//       bidHistoryItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
//       bidHistoryItem.innerHTML = `${bid.amount} <span class="text-muted">${bid.bidder.name} - ${new Date(
//         bid.created
//       ).toLocaleDateString()}</span>`;
//       bidHistoryList.append(bidHistoryItem);
//     });
//   } else {
//     const noBidsItem = document.createElement("li");
//     noBidsItem.classList.add("list-group-item", "text-muted");
//     noBidsItem.textContent = "No bids yet.";
//     bidHistoryList.append(noBidsItem);
//   }

//   bidHistoryDiv.append(bidHistoryCollapseBtn, bidHistoryList);
//   detailsDiv.appendChild(bidHistoryDiv);

//   // Seller Information (placed under Bid History)
//   const sellerDiv = document.createElement("div");
//   sellerDiv.classList.add("mt-1", "d-flex", "align-items-center");

//   const sellerTitle = document.createElement("p");
//   sellerTitle.classList.add("fw-bold", "me-3", "fs-6", "mb-0");
//   sellerTitle.textContent = "Seller:";

//   const sellerInfo = document.createElement("div");

//   const sellerLink = document.createElement("a");
//   sellerLink.href = "#";
//   sellerLink.textContent = seller?.name ?? "UserName";
//   sellerLink.classList.add("text-decoration-none", "mb-0", "p-0");

//   sellerInfo.appendChild(sellerLink);
//   sellerDiv.append(sellerTitle, sellerInfo);
//   detailsDiv.appendChild(sellerDiv);

//   if (seller.name === currentUser) {
//     console.log("This listing belongs to the current user.");

//     const optionsDiv = document.createElement("div");
//     optionsDiv.classList.add("dropdown");

//     const optionsButton = document.createElement("button");
//     optionsButton.classList.add("btn", "btn-link", "p-0", "mt-3", "px-2", "py-1");
//     optionsButton.setAttribute("id", "dropdownMenuButton");
//     optionsButton.setAttribute("data-bs-toggle", "dropdown");
//     optionsButton.setAttribute("aria-expanded", "false");
//     optionsButton.style.textDecoration = "none";
//     optionsButton.style.border = "1px solid var(--bs-primary)";
//     optionsButton.innerHTML = `<span>Options</span><i class="bi bi-three-dots-vertical"></i>`;

//     const optionsMenu = document.createElement("ul");
//     optionsMenu.classList.add("dropdown-menu");
//     optionsMenu.setAttribute("aria-labelledby", "dropdownMenuButton");

//     const editOption = document.createElement("li");
//     editOption.innerHTML = `<a class="dropdown-item" href="/profile/edit-listing.html?id=${listing.data.id}">Edit</a>`;

//     const deleteOption = document.createElement("li");
//     deleteOption.innerHTML = `<a class="dropdown-item text-danger" href="#" data-action="delete" data-id="${listing.data.id}">Delete</a>`;

//     optionsMenu.append(editOption, deleteOption);
//     optionsDiv.append(optionsButton, optionsMenu);
//     detailsDiv.appendChild(optionsDiv);

//     // Add event listener for delete action
//     deleteOption.querySelector("a").addEventListener("click", async (event) => {
//       event.preventDefault(); // Prevent the default link behavior

//       const shouldYouDelete = confirm("Are you sure you want to delete this listing?");
//       if (shouldYouDelete) {
//         try {
//           await deleteListing(listing.data.id);
//           messageForUser("#messageForUser", "success", "Listing deleted successfully.");

//           setTimeout(() => {
//             window.location.href = "/profile/";
//           }, 3000);
//         } catch (error) {
//           console.error("Error deleting listing:", error);
//           messageForUser("#messageForUser", "danger", "Failed to delete listing.");
//         }
//       }
//     });
//   } else {
//     console.log("This listing does NOT belong to the current user.");

//     const bidInputDiv = document.createElement("div");
//     bidInputDiv.classList.add("mb-3");

//     const bidInputLabel = document.createElement("label");
//     bidInputLabel.classList.add("form-label");
//     bidInputLabel.textContent = "Your Bid:";

//     const bidInput = document.createElement("input");
//     bidInput.type = "number";
//     bidInput.classList.add("form-control");
//     bidInput.placeholder = "Enter your bid";

//     bidInputDiv.append(bidInputLabel, bidInput);
//     detailsDiv.appendChild(bidInputDiv);

//     const bidButton = document.createElement("button");
//     bidButton.classList.add("btn", "btn-primary", "text-white", "mt-4", "w-100");
//     bidButton.textContent = "Place Bid";

//     // Add event listener for placing a bid
//     bidButton.addEventListener("click", async (event) => {
//       event.preventDefault();

//       const bidAmount = parseFloat(bidInput.value);

//       if (bidAmount && bidAmount > 0) {
//         try {
//           await placeBidHandler(listing.data.id, bidAmount);
//           messageForUser("#messageForUser", "success", "Bid placed successfully.");

//           // Optionally, refresh the listing data to show the updated bid
//           setTimeout(() => {
//             window.location.reload();
//           }, 2000);
//         } catch (error) {
//           console.error("Error placing bid:", error);
//           messageForUser("#messageForUser", "danger", "Failed to place bid.");
//         }
//       } else {
//         alert("Please enter a valid bid amount.");
//       }
//     });

//     detailsDiv.appendChild(bidButton);
//   }

//   wrapperDiv.append(imageDiv, detailsDiv);
//   container.append(wrapperDiv);

//   // Start the countdown
//   startCountdown(endsAt, document.getElementById("countdown"));
// }

// import { startCountdown } from "./startCountdown.js";
// import { getUserName } from "../utils/helpers/getUserName.js";
// import { deleteListing } from "../api/listings/deleteListing.js";
// import { placeBid } from "../api/listings/placeBid.js";
// import { messageForUser } from "./messageForUser.js";

// export function renderSingleListing(parent, listing) {
//   const container = document.querySelector(parent);
//   container.innerHTML = "";

//   const { title, description, media, endsAt, _count = {}, seller, bids } = listing.data;
//   const highestBid = bids.reduce((max, bid) => (bid.amount > max ? bid.amount : max), 0);
//   const currentUser = getUserName(); // Get the logged-in user's name

//   console.log("Current User:", currentUser); // Debugging current user
//   console.log("Listing Seller:", seller.name);

//   // Main container
//   const wrapperDiv = document.createElement("div");
//   wrapperDiv.classList.add("d-flex", "col-md-10", "mx-auto", "gap-5");

//   // Image section
//   const imageDiv = document.createElement("div");
//   imageDiv.classList.add("col-md-5");

//   // Variable to hold the main image element for swapping
//   let mainImg = null;

//   if (media && media.length > 0) {
//     // First image as the main large image
//     mainImg = document.createElement("img");
//     mainImg.src = media[0].url;
//     mainImg.alt = media[0].alt || "Listing image";
//     mainImg.classList.add("img-fluid", "rounded", "shadow-sm", "mb-2");
//     imageDiv.appendChild(mainImg);

//     // Remaining images (up to 3) as smaller images below the main image
//     const smallerImagesDiv = document.createElement("div");
//     smallerImagesDiv.classList.add("d-flex", "gap-2", "flex-wrap");

//     media.slice(1, 4).forEach((item) => {
//       const imgWrapper = document.createElement("div");
//       imgWrapper.style.width = "32%"; // Each image takes up 32% of the width
//       imgWrapper.classList.add("cursor-pointer");

//       const img = document.createElement("img");
//       img.src = item.url;
//       img.alt = item.alt || "Listing image";
//       img.classList.add("img-fluid", "rounded", "shadow-sm", "cursor-pointer");
//       img.style.objectFit = "cover"; // Ensures the images are not stretched
//       img.style.width = "100%";
//       img.style.height = "100px";

//       // Add click event to replace the main image
//       imgWrapper.addEventListener("click", () => {
//         mainImg.src = item.url;
//         mainImg.alt = item.alt || "Listing image";
//       });

//       imgWrapper.appendChild(img);
//       smallerImagesDiv.appendChild(imgWrapper);
//     });

//     imageDiv.appendChild(smallerImagesDiv);
//   } else {
//     const img = document.createElement("img");
//     img.src = "../images/placeholder.png";
//     img.alt = "Placeholder image";
//     img.classList.add("img-fluid", "rounded", "shadow-sm");
//     imageDiv.appendChild(img);
//   }

//   // Details section
//   const detailsDiv = document.createElement("div");
//   detailsDiv.classList.add("col-md-5", "d-flex", "flex-column");

//   const titleElement = document.createElement("h1");
//   titleElement.classList.add("fw-bold", "mb-3");
//   titleElement.textContent = title ?? "No title";

//   const countdownElement = document.createElement("p");
//   countdownElement.classList.add("text-muted", "fs-6", "mb-2");
//   countdownElement.innerHTML = `<strong>Ends in:</strong> <span id="countdown"></span>`;
//   detailsDiv.append(titleElement, countdownElement);

//   // Description section (placed under "Ends in" and above "Current bid")
//   if (description) {
//     const descriptionElement = document.createElement("p");
//     descriptionElement.classList.add("text-muted", "fs-6", "mb-2");
//     descriptionElement.innerHTML = `<strong>Description:</strong> ${description}`;
//     detailsDiv.appendChild(descriptionElement);
//   }

//   // Current Bid
//   const highestBidElement = document.createElement("p");
//   highestBidElement.classList.add("text-muted", "mb-2", "fs-6");
//   // currentBidElement.innerHTML = `<strong>Current bid:</strong> ${_count.bids ?? 0}`;
//   highestBidElement.innerHTML = `<strong>Highest bid:</strong> ${highestBid}`;

//   detailsDiv.appendChild(highestBidElement);

//   // Bid History Section with Collapse
//   const bidHistoryDiv = document.createElement("div");
//   const bidHistoryCollapseBtn = document.createElement("button");
//   bidHistoryCollapseBtn.classList.add("btn", "btn-link", "p-0", "mb-2", "fs-6");
//   bidHistoryCollapseBtn.setAttribute("data-bs-toggle", "collapse");
//   bidHistoryCollapseBtn.setAttribute("data-bs-target", "#bidHistoryList");
//   bidHistoryCollapseBtn.textContent = "View Bid History";
//   bidHistoryCollapseBtn.style.textDecoration = "none";

//   const bidHistoryList = document.createElement("ul");
//   bidHistoryList.classList.add("list-group", "collapse");
//   bidHistoryList.id = "bidHistoryList";

//   // Loop through bids and display them
//   if (bids && bids.length > 0) {
//     bids.forEach((bid) => {
//       const bidHistoryItem = document.createElement("li");
//       bidHistoryItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
//       bidHistoryItem.innerHTML = `${bid.amount} <span class="text-muted">${bid.bidder.name} - ${new Date(
//         bid.created
//       ).toLocaleDateString()}</span>`;
//       bidHistoryList.append(bidHistoryItem);
//     });
//   } else {
//     const noBidsItem = document.createElement("li");
//     noBidsItem.classList.add("list-group-item", "text-muted");
//     noBidsItem.textContent = "No bids yet.";
//     bidHistoryList.append(noBidsItem);
//   }

//   bidHistoryDiv.append(bidHistoryCollapseBtn, bidHistoryList);
//   detailsDiv.appendChild(bidHistoryDiv);

//   // Seller Information (placed under Bid History)
//   const sellerDiv = document.createElement("div");
//   sellerDiv.classList.add("mt-1", "d-flex", "align-items-center");

//   const sellerTitle = document.createElement("p");
//   sellerTitle.classList.add("fw-bold", "me-3", "fs-6", "mb-0");
//   sellerTitle.textContent = "Seller:";

//   const sellerInfo = document.createElement("div");

//   // Create the seller name as a link
//   const sellerLink = document.createElement("a");
//   sellerLink.href = "#"; // Set the link to the seller's profile, for now, it's "#"
//   sellerLink.textContent = seller?.name ?? "UserName";
//   sellerLink.classList.add("text-decoration-none", "mb-0", "p-0"); // Remove underline and margin/padding

//   // Append the link to the sellerInfo div
//   sellerInfo.appendChild(sellerLink);
//   sellerDiv.append(sellerTitle, sellerInfo);
//   detailsDiv.appendChild(sellerDiv);

//   if (seller.name === currentUser) {
//     console.log("This listing belongs to the current user.");
//     // Show 3-dot options if the listing belongs to the current user
//     const optionsDiv = document.createElement("div");
//     optionsDiv.classList.add("dropdown");

//     const optionsButton = document.createElement("button");
//     optionsButton.classList.add("btn", "btn-link", "p-0", "mt-3", "px-2", "py-1");
//     optionsButton.setAttribute("id", "dropdownMenuButton");
//     optionsButton.setAttribute("data-bs-toggle", "dropdown");
//     optionsButton.setAttribute("aria-expanded", "false");
//     optionsButton.style.textDecoration = "none";
//     optionsButton.style.border = "1px solid var(--bs-primary)";
//     optionsButton.innerHTML = `<span>Options</span><i class="bi bi-three-dots-vertical"></i>`;

//     const optionsMenu = document.createElement("ul");
//     optionsMenu.classList.add("dropdown-menu");
//     optionsMenu.setAttribute("aria-labelledby", "dropdownMenuButton");

//     const editOption = document.createElement("li");
//     editOption.innerHTML = `<a class="dropdown-item" href="/profile/edit-listing.html?id=${listing.data.id}">Edit</a>`;

//     const deleteOption = document.createElement("li");
//     deleteOption.innerHTML = `<a class="dropdown-item text-danger" href="#" data-action="delete" data-id="${listing.data.id}">Delete</a>`;

//     optionsMenu.append(editOption, deleteOption);
//     optionsDiv.append(optionsButton, optionsMenu);
//     detailsDiv.appendChild(optionsDiv);

//     // Add event listener for delete action
//     deleteOption.querySelector("a").addEventListener("click", async (event) => {
//       event.preventDefault(); // Prevent the default link behavior

//       const shouldYouDelete = confirm("Are you sure you want to delete this listing?");
//       if (shouldYouDelete) {
//         try {
//           await deleteListing(listing.data.id);
//           messageForUser("#messageForUser", "success", "Listing deleted successfully.");

//           setTimeout(() => {
//             window.location.href = "/profile/";
//           }, 3000);
//         } catch (error) {
//           console.error("Error deleting listing:", error);
//           messageForUser("#messageForUser", "danger", "Failed to delete listing.");
//         }
//       }
//     });
//   } else {
//     console.log("This listing does NOT belong to the current user.");

//     // Register to Bid Button (taking full width and pushed to the bottom)
//     const bidButton = document.createElement("a");
//     bidButton.classList.add("btn", "btn-primary", "text-white", "mt-4");
//     bidButton.href = "#";
//     bidButton.textContent = "PLACE YOUR BID";

//     // Add event listener for placing a bid
//     bidButton.addEventListener("click", async (event) => {
//       event.preventDefault();

//       const bidAmount = prompt("Enter your bid amount:");

//       if (bidAmount && !isNaN(bidAmount)) {
//         try {
//           await placeBid(listing.data.id, parseFloat(bidAmount));
//           messageForUser("#messageForUser", "success", "Bid placed successfully.");

//           // Optionally, refresh the listing data to show the updated bid
//           setTimeout(() => {
//             window.location.reload();
//           }, 3000);
//         } catch (error) {
//           console.error("Error placing bid:", error);
//           messageForUser("#messageForUser", "danger", "Failed to place bid.");
//         }
//       } else {
//         alert("Please enter a valid bid amount.");
//       }
//     });

//     detailsDiv.appendChild(bidButton);
//   }

//   // Append everything to the wrapper
//   wrapperDiv.append(imageDiv, detailsDiv);
//   container.append(wrapperDiv);

//   // Start the countdown
//   startCountdown(endsAt, document.getElementById("countdown"));
// }
