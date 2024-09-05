import { getToken } from "../../utils/helpers/token.js";
import { messageForUser } from "../../ui/messageForUser.js";

export function checkRegistration() {
  const restrictedLinks = document.querySelectorAll(".restricted-link");

  restrictedLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const token = getToken();

      if (!token) {
        event.preventDefault(); // Prevent the link from being followed
        messageForUser("#messageForUser", "warning", "You must be registered to access this feature.");
        console.log("User not logged in, action prevented.");
      } else {
        console.log("User logged in, action allowed.");
      }
    });
  });
}
