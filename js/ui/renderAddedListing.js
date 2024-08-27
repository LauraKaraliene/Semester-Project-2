import { startCountdown } from "./startCountdown.js";

// export function renderAddedListing(parentSelector, listing) {
//   const container = document.querySelector(parentSelector);

//   const { id, title, _count = {}, endsAt } = listing;

//   const wrapperDiv = document.createElement("div");
//   wrapperDiv.classList.add("listing-item", "mb-3");

//   // Create a link for the listing
//   const listingLink = document.createElement("a");
//   listingLink.href = `/profile/single-listing.html?id=${id}`;
//   listingLink.classList.add("text-decoration-none", "text-dark");

//   // Title element
//   const titleElement = document.createElement("h5");
//   titleElement.classList.add("fw-bold", "mb-2");
//   titleElement.textContent = title ?? "No title";

//   // Bids count element
//   const bidsElement = document.createElement("p");
//   bidsElement.classList.add("text-muted", "mb-1");
//   bidsElement.innerHTML = `<strong>Bids:</strong> ${_count.bids ?? 0}`;

//   // Countdown element
//   const countdownElement = document.createElement("p");
//   countdownElement.classList.add("text-muted", "mb-1");
//   countdownElement.innerHTML = `<strong>Ends in:</strong> <span id="countdown-${id}"></span>`;

//   // Append elements to the link and then to the wrapper
//   listingLink.append(titleElement, bidsElement, countdownElement);
//   wrapperDiv.appendChild(listingLink);
//   container.appendChild(wrapperDiv);

//   // Start the countdown
//   startCountdown(endsAt, document.getElementById(`countdown-${id}`));
// }

// export function renderAddedListing(parentSelector, listing) {
//   const container = document.querySelector(parentSelector);

//   const { title, description, media, endsAt } = listing;

//   const wrapperDiv = document.createElement("div");
//   wrapperDiv.classList.add("d-flex", "col-md-10", "mx-auto", "gap-5", "mb-4", "new-listing");

//   const imageDiv = document.createElement("div");
//   imageDiv.classList.add("col-md-5");

//   let mainImg = document.createElement("img");
//   if (media && media.length > 0) {
//     mainImg.src = media[0].url;
//     mainImg.alt = media[0].alt || "Listing image";
//   } else {
//     mainImg.src = "../images/placeholder.png";
//     mainImg.alt = "Placeholder image";
//   }
//   mainImg.classList.add("img-fluid", "rounded", "shadow-sm", "mb-2");
//   imageDiv.appendChild(mainImg);

//   const detailsDiv = document.createElement("div");
//   detailsDiv.classList.add("col-md-7", "d-flex", "flex-column");

//   const titleElement = document.createElement("h2");
//   titleElement.classList.add("fw-bold", "mb-3");
//   titleElement.textContent = title ?? "No title";

//   const countdownElement = document.createElement("p");
//   countdownElement.classList.add("text-muted", "fs-6", "mb-2");
//   countdownElement.innerHTML = `<strong>Ends in:</strong> <span id="countdown-${listing.id}"></span>`;

//   detailsDiv.append(titleElement, countdownElement);

//   if (description) {
//     const descriptionElement = document.createElement("p");
//     descriptionElement.classList.add("text-muted", "fs-6", "mb-2");
//     descriptionElement.textContent = description;
//     detailsDiv.appendChild(descriptionElement);
//   }

//   wrapperDiv.append(imageDiv, detailsDiv);
//   container.appendChild(wrapperDiv);

//   startCountdown(endsAt, document.getElementById(`countdown-${listing.id}`));
// }
