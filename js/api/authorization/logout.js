import * as storage from "../../utils/storage/storage.js";

export function logout() {
  const doYouWantToLogout = confirm("Are you sure you want to logout?");
  if (doYouWantToLogout) {
    storage.removeMultiple(["token", "userName", "email"]);
    window.location.href = "/index.html";
  }
}
