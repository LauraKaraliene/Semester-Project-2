import { startCountdown } from "./startCountdown.js";

export function renderSingleListing(parent, listing) {
  const container = document.querySelector(parent);
  container.innerHTML = "";

  const { title, description, media, endsAt, _count = {}, seller, bids } = listing.data;

  // Main container
  const wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("d-flex", "col-md-10", "mx-auto", "gap-5");

  // Image section
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("col-md-5");

  // Variable to hold the main image element for swapping
  let mainImg = null;

  if (media && media.length > 0) {
    // First image as the main large image
    mainImg = document.createElement("img");
    mainImg.src = media[0].url;
    mainImg.alt = media[0].alt || "Listing image";
    mainImg.classList.add("img-fluid", "rounded", "shadow-sm", "mb-2");
    imageDiv.appendChild(mainImg);

    // Remaining images (up to 3) as smaller images below the main image
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
      img.style.objectFit = "cover"; // Ensures the images are not stretched
      img.style.width = "100%";
      img.style.height = "100px";

      // Add click event to replace the main image
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
  countdownElement.classList.add("text-muted", "fs-6", "mb-2");
  countdownElement.innerHTML = `<strong>Ends in:</strong> <span id="countdown"></span>`;

  // Append title and countdown to detailsDiv
  detailsDiv.append(titleElement, countdownElement);

  // Description section (placed under "Ends in" and above "Current bid")
  if (description) {
    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("text-muted", "fs-6", "mb-2");
    descriptionElement.innerHTML = `<strong>Description:</strong> ${description}`;
    detailsDiv.appendChild(descriptionElement);
  }

  // Current Bid
  const currentBidElement = document.createElement("p");
  currentBidElement.classList.add("text-muted", "mb-2", "fs-6");
  currentBidElement.innerHTML = `<strong>Current bid:</strong> ${_count.bids ?? 0}`;

  detailsDiv.appendChild(currentBidElement);

  // Bid History Section with Collapse
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

  // Loop through bids and display them
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

  // Seller Information (placed under Bid History)
  const sellerDiv = document.createElement("div");
  sellerDiv.classList.add("mt-4", "d-flex", "align-items-center");

  const sellerTitle = document.createElement("p");
  sellerTitle.classList.add("fw-bold", "me-3", "fs-6", "mb-0");
  sellerTitle.textContent = "Seller:";

  const sellerInfo = document.createElement("div");

  // Create the seller name as a link
  const sellerLink = document.createElement("a");
  sellerLink.href = "#"; // Set the link to the seller's profile, for now, it's "#"
  sellerLink.textContent = seller?.name ?? "UserName";
  sellerLink.classList.add("text-decoration-none", "mb-0", "p-0"); // Remove underline and margin/padding

  // Append the link to the sellerInfo div
  sellerInfo.appendChild(sellerLink);
  sellerDiv.append(sellerTitle, sellerInfo);
  detailsDiv.appendChild(sellerDiv);

  // Register to Bid Button (taking full width and pushed to the bottom)
  const bidButton = document.createElement("a");
  bidButton.classList.add("btn", "btn-primary", "text-white", "mt-4");
  bidButton.href = "#";
  bidButton.textContent = "PLACE YOUR BID";
  detailsDiv.appendChild(bidButton);

  // Append everything to the wrapper
  wrapperDiv.append(imageDiv, detailsDiv);
  container.append(wrapperDiv);

  // Start the countdown
  startCountdown(endsAt, document.getElementById("countdown"));
}

// export function renderSingleListing(parent, listing) {
//   const container = document.querySelector(parent);
//   container.innerHTML = "";

//   const { title, description, media, endsAt, _count = {}, seller, bids } = listing.data;

//   // Main container
//   const wrapperDiv = document.createElement("div");
//   wrapperDiv.classList.add("d-flex", "col-md-10", "mx-auto", "gap-5");

//   // Image section
//   const imageDiv = document.createElement("div");
//   imageDiv.classList.add("col-md-5");

//   if (media && media.length > 0) {
//     // First image as the main large image
//     const mainImg = document.createElement("img");
//     mainImg.src = media[0].url;
//     mainImg.alt = media[0].alt || "Listing image";
//     mainImg.classList.add("img-fluid", "rounded", "shadow-sm", "mb-2");
//     imageDiv.appendChild(mainImg);

//     // Remaining images (up to 3) as smaller images below the main image
//     const smallerImagesDiv = document.createElement("div");
//     smallerImagesDiv.classList.add("d-flex", "gap-2", "flex-wrap");

//     media.slice(1, 4).forEach((item) => {
//       const img = document.createElement("img");
//       img.src = item.url;
//       img.alt = item.alt || "Listing image";
//       img.classList.add("img-fluid", "rounded", "shadow-sm");
//       img.style.width = "32%"; // 32% width for up to 3 images
//       img.style.height = "100px";
//       smallerImagesDiv.appendChild(img);
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

//   // Append title and countdown to detailsDiv
//   detailsDiv.append(titleElement, countdownElement);

//   // Description section (placed under "Ends in" and above "Current bid")
//   if (description) {
//     const descriptionElement = document.createElement("p");
//     descriptionElement.classList.add("text-muted", "fs-6", "mb-2");
//     descriptionElement.innerHTML = `<strong>Description:</strong> ${description}`;
//     detailsDiv.appendChild(descriptionElement);
//   }

//   // Current Bid
//   const currentBidElement = document.createElement("p");
//   currentBidElement.classList.add("text-muted", "mb-2", "fs-6");
//   currentBidElement.innerHTML = `<strong>Current bid:</strong> ${_count.bids ?? 0}`;

//   detailsDiv.appendChild(currentBidElement);

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
//   sellerDiv.classList.add("mt-4", "d-flex", "align-items-center");

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

//   // Register to Bid Button (taking full width and pushed to the bottom)
//   const bidButton = document.createElement("a");
//   bidButton.classList.add("btn", "btn-primary", "text-white", "mt-4");
//   bidButton.href = "#";
//   bidButton.textContent = "PLACE YOUR BID";
//   detailsDiv.appendChild(bidButton);

//   // Append everything to the wrapper
//   wrapperDiv.append(imageDiv, detailsDiv);
//   container.append(wrapperDiv);

//   // Start the countdown
//   startCountdown(endsAt, document.getElementById("countdown"));
// }
