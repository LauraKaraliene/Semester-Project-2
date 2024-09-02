import { logout } from "../../api/authorization/logout.js";

export function logoutHandler() {
  const logoutButton = document.querySelector("#logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }
}
