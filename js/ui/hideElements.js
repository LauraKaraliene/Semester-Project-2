import { getToken } from "../utils/helpers/token.js";

export function handleRestrictedLinks() {
  const token = getToken();
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
