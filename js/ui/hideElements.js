// import { getToken } from "../utils/helpers/token.js";

// export function hideElements() {
//   console.log("Checking for token...");
//   const token = getToken();
//   console.log("Token value:", token);

//   if (!token) {
//     const sellLink = document.getElementById("sellLink");
//     const profileLink = document.getElementById("profileLink");

//     if (sellLink) {
//       sellLink.style.display = "none"; // Hide Sell link
//     }
//     if (profileLink) {
//       profileLink.style.display = "none"; // Hide Profile link
//     }

//     console.log("Token not found, hiding Sell and Profile links.");
//   } else {
//     console.log("Token found, displaying all links.");
//   }
// }

import { getToken } from "../utils/helpers/token.js";

export function handleRestrictedLinks() {
  console.log("Checking for token...");
  const token = getToken();
  console.log("Token value:", token);

  const sellLink = document.getElementById("sellLink");
  const profileLink = document.getElementById("profileLink");

  if (!token) {
    if (sellLink) {
      sellLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "/login/index.html";
      });
    }

    if (profileLink) {
      profileLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "/login/index.html";
      });
    }

    console.log("Token not found, redirecting to login on click.");
  } else {
    console.log("Token found, links are active.");
  }
}
