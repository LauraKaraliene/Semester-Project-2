// import { loggedIn } from "../../utils/helpers/loggedIn.js";
// import { logoutHandler } from "./logoutHandler.js";

// export function authLinkHandler() {
//   const authAction = document.getElementById("authAction");

//   if (loggedIn()) {
//     authAction.textContent = "Logout";
//     authAction.id = "logout"; // change id to easily target it for logout
//     logoutHandler();
//   } else {
//     authAction.textContent = "Login";
//     authAction.href = "/login/index.html";
//   }
// }
import { loggedIn } from "../../utils/helpers/loggedIn.js";
import { logoutHandler } from "./logoutHandler.js";

export function authLinkHandler() {
  const authAction = document.getElementById("authAction");

  if (authAction) {
    // Check if the element exists
    if (loggedIn()) {
      authAction.textContent = "Logout";
      authAction.id = "logout"; // change id to easily target it for logout
      logoutHandler();
    } else {
      authAction.textContent = "Login";
      authAction.href = "/login/index.html";
    }
  } else {
    console.warn("authAction element not found on this page.");
  }
}
