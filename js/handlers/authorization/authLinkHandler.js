import { loggedIn } from "../../utils/helpers/loggedIn.js";
import { logoutHandler } from "./logoutHandler.js";

export function authLinkHandler() {
  const authAction = document.getElementById("authAction");

  if (authAction) {
    if (loggedIn()) {
      authAction.textContent = "Logout";
      authAction.id = "logout";
      logoutHandler();
    } else {
      authAction.textContent = "Login";
      authAction.href = "/login/index.html";
    }
  } else {
    console.warn("authAction element not found on this page.");
  }
}
