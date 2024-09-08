import { startCountdown } from "./startCountdown.js";

export function renderAllListings(parent, listings, basePath = "") {
  const container = document.querySelector(parent);
  const loader = document.querySelector(".loader");

  container.innerHTML = "";

  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row", "g-4");

  listings.forEach((listing) => {
    rowDiv.append(createListings(listing, basePath));
  });

  container.append(rowDiv);

  if (loader) {
    loader.style.display = "none";
  }
}

function createListings(listing, basePath = "") {
  const { id, title, media, _count, endsAt } = listing;

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-12", "mb-4");

  const card = document.createElement("div");
  card.classList.add("card", "border-1", "border-primary", "h-100", "d-flex", "flex-column", "shadow");

  const cardImgContainer = document.createElement("div");
  cardImgContainer.classList.add("img-container");

  const cardImg = document.createElement("img");
  if (media && media.length > 0 && media[0].url) {
    cardImg.src = media[0].url;
    cardImg.alt = media[0].alt || "Listing image";
  } else {
    cardImg.src = `${basePath}images/placeholder.png`;
    cardImg.alt = "Placeholder image";
  }
  cardImg.classList.add("card-img-top", "img-fluid", "h-100", "w-100", "object-fit-cover");

  cardImgContainer.append(cardImg);
  card.append(cardImgContainer);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "d-flex", "flex-column");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title", "text-truncate", "text-start");
  cardTitle.textContent = title ?? "No title";
  cardBody.append(cardTitle);

  const bidCount = document.createElement("p");
  bidCount.classList.add("card-text", "mb-2");
  bidCount.innerHTML = `<strong>Bids:</strong> ${_count.bids ?? 0}`;
  cardBody.append(bidCount);

  const endsIn = document.createElement("p");
  const countdownDiv = document.createElement("p");
  endsIn.classList.add("card-text", "mb-0", "fs-6");
  countdownDiv.classList.add("card-text", "mb-2", "fs-6");
  endsIn.innerHTML = `<strong>Ends in:</strong>`;
  cardBody.append(endsIn, countdownDiv);

  const viewMoreBtn = document.createElement("a");
  viewMoreBtn.classList.add(
    "btn",
    "view-more-btn",
    "text-primary",
    "border-1",
    "border-primary",
    "mt-3",
    "shadow-sm",
    "montserrat"
  );
  viewMoreBtn.href = `${basePath}listing/listing.html?id=${id}`;
  viewMoreBtn.textContent = "View more";
  cardBody.append(viewMoreBtn);

  card.append(cardBody);
  cardDiv.append(card);
  startCountdown(endsAt, countdownDiv);

  return cardDiv;
}
