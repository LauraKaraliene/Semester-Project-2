import { loggedIn } from "../../utils/helpers/loggedIn.js";
import { messageForUser } from "../../ui/messageForUser.js";

export function requireRegistration(elementId, message) {
  const element = document.getElementById(elementId);

  if (element) {
    console.log(`Adding listener to ${elementId}`);

    element.addEventListener("click", (event) => {
      if (!loggedIn()) {
        event.preventDefault();
        console.warn(`Blocked action on ${elementId}: ${message}`);
        messageForUser("#messageForUser", "warning", message);
      }
    });
  } else {
    console.error(`Element with ID ${elementId} not found`);
  }
}
