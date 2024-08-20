import { startCountdown } from "./startCountdown.js";

export function renderSingleListing(parent, listing) {
  const container = document.querySelector(parent);
  container.innerHTML = "";

  // const { title, description, media, endsAt, _count = {}, seller } = listing;
  const { title, description, media, endsAt, _count = {}, seller } = listing.data;

  //main container
  const wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("d-flex", "col-md-10", "mx-auto", "gap-5");

  //image section
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("col-md-5");

  if (media && media.length > 0) {
    console.log("Rendering images:", media); // Log the media data to verify
    media.forEach((item) => {
      const img = document.createElement("img");
      img.src = item.url;
      img.alt = item.alt || "Listing image";
      img.classList.add("img-fluid", "rounded", "shadow-sm", "mb-2");
      imageDiv.appendChild(img);
    });
  } else {
    console.log("No media found, displaying placeholder.");
    const img = document.createElement("img");
    img.src = "../images/placeholder.png"; // Path to your placeholder image
    img.alt = "Placeholder image";
    img.classList.add("img-fluid", "rounded", "shadow-sm");
    imageDiv.appendChild(img);
  }

  //details section
  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("col-md-5");

  //title
  const titleElement = document.createElement("h1");
  titleElement.classList.add("fw-bold", "mb-2");
  titleElement.textContent = title ?? "No title";

  //countdown timer
  const countdownElement = document.createElement("p");
  countdownElement.classList.add("text-muted", "fs-6", "mb-2");
  countdownElement.innerHTML = `<strong>Ends in:</strong> <span id="countdown"></span>`;

  // Current Bid
  const currentBidElement = document.createElement("p");
  currentBidElement.classList.add("text-muted", "mb-4", "fs-5");
  currentBidElement.innerHTML = `<strong>Current bid:</strong> ${_count.bids ?? 0}`;

  // Register to Bid Button
  const bidButton = document.createElement("a");
  bidButton.classList.add("btn", "btn-primary", "text-white", "px-4", "py-2");
  bidButton.href = "#"; // Link to the bidding functionality
  bidButton.textContent = "REGISTER TO BID";

  // Append all to the details section
  detailsDiv.append(titleElement, countdownElement, currentBidElement, bidButton);

  //description section
  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("mt-4");

  const descriptionTitle = document.createElement("h4");
  descriptionTitle.classList.add("fw-bold", "mb-3");
  descriptionTitle.textContent = "Description";

  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("text-muted");
  descriptionElement.textContent = description ?? "No description available.";

  descriptionDiv.append(descriptionTitle, descriptionElement);

  // Bid History
  const bidHistoryDiv = document.createElement("div");
  bidHistoryDiv.classList.add("mt-4");

  const bidHistoryTitle = document.createElement("h4");
  bidHistoryTitle.classList.add("fw-bold", "mb-3");
  bidHistoryTitle.textContent = "Bid history";

  const bidHistoryList = document.createElement("ul");
  bidHistoryList.classList.add("list-group");

  //get the bid history data from the server
  // loop through bid history data and add to the list.
  const bidHistoryItem = document.createElement("li");
  bidHistoryItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
  bidHistoryItem.innerHTML = `10 <span class="text-muted">user666 - 2 days ago</span>`;

  bidHistoryList.append(bidHistoryItem);
  bidHistoryDiv.append(bidHistoryTitle, bidHistoryList);

  // Seller Information
  const sellerDiv = document.createElement("div");
  sellerDiv.classList.add("mt-4");

  const sellerTitle = document.createElement("h4");
  sellerTitle.classList.add("fw-bold", "mb-3");
  sellerTitle.textContent = "Seller";

  const sellerInfo = document.createElement("div");
  sellerInfo.classList.add("d-flex", "align-items-center");

  const sellerImg = document.createElement("img");
  sellerImg.src = "../images/user.png";
  sellerImg.alt = "Seller image";
  sellerImg.classList.add("rounded-circle", "me-3");
  sellerImg.style.width = "50px";

  const sellerName = document.createElement("p");
  sellerName.classList.add("mb-0");
  sellerName.textContent = seller?.name ?? "UserName";

  sellerInfo.append(sellerImg, sellerName);
  sellerDiv.append(sellerTitle, sellerInfo);

  // Append everything to the wrapper
  wrapperDiv.append(imageDiv, detailsDiv);
  container.append(wrapperDiv, descriptionDiv, bidHistoryDiv, sellerDiv);

  // Start the countdown
  startCountdown(endsAt, document.getElementById("countdown"));
}
