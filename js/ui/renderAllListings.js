import { startCountdown } from "./startCountdown.js";

export function renderAllListings(parent, listings) {
  const container = document.querySelector(parent);
  const loader = document.querySelector(".loader");

  console.log(listings);

  container.innerHTML = "";

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row", "g-4");

  const allListingsHtml = listings.map((listing) => {
    return createListings(listing);
  });

  rowDiv.append(...allListingsHtml);

  container.append(rowDiv);
  loader.style.display = "none";
}

function createListings(listing) {
  const { id, title, media, _count, endsAt } = listing;

  //card container
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("col-md-3", "mb-4");

  const card = document.createElement("div");
  card.classList.add("card", "border-1", "border-primary", "h-100", "d-flex", "flex-column");

  //add images to the card
  const cardImgContainer = document.createElement("div");
  cardImgContainer.classList.add("img-container");

  const cardImg = document.createElement("img");
  if (media && media.length > 0 && media[0].url) {
    cardImg.src = media[0].url;
    cardImg.alt = media[0].alt || "Listing image";
  } else {
    cardImg.src = "images/placeholder.png"; // Path to your placeholder image
    cardImg.alt = "Placeholder image";
  }
  cardImg.classList.add("card-img-top", "img-fluid", "h-100", "w-100", "object-fit-cover");

  cardImgContainer.append(cardImg);
  card.append(cardImgContainer);

  //card body
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "d-flex", "flex-column");

  //add title
  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title", "text-truncate", "text-start");
  cardTitle.textContent = title ?? "No title";
  cardBody.append(cardTitle);

  //add the bid count
  const bidCount = document.createElement("p");
  bidCount.classList.add("card-text", "mb-2");
  bidCount.innerHTML = `<strong>Bids:</strong> ${_count.bids ?? 0}`;
  cardBody.append(bidCount);

  // Add the countdown timer
  const countdownDiv = document.createElement("p");
  countdownDiv.classList.add("card-text", "mb-2", "text-muted", "fs-6");
  cardBody.append(countdownDiv);

  //   //add the end date
  //   const endDate = document.createElement("p");
  //   endDate.classList.add("card-text", "mb-2", "text-muted");
  //   endDate.innerHTML = `<strong>Ends At:</strong> ${new Date(endsAt).toLocaleDateString()}`;
  //   cardBody.append(endDate);

  //add "view more" button
  const viewMoreBtn = document.createElement("a");
  viewMoreBtn.classList.add("btn", "text-primary", "border-1", "border-primary", "mt-3");
  viewMoreBtn.href = `/listing/listing.html?id=${id}`;
  viewMoreBtn.textContent = "View more";
  cardBody.append(viewMoreBtn);

  //append card body to card
  card.append(cardBody);
  cardDiv.append(card);
  startCountdown(endsAt, countdownDiv);

  return cardDiv;
}
