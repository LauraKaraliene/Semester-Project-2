import { authLinkHandler } from "./handlers/authorization/authLinkHandler.js";
import { loginFormHandler } from "./handlers/authorization/loginFormHandler.js";
import { registerFormHandler } from "./handlers/authorization/registerFormHandler.js";
import { displayAllListingsHandler } from "./handlers/listings/displayAllListingsHandler.js";

// import { displaySingleListingHandler } from "./handlers/listings/displaySingleListingHandler.js";

function route() {
  const path = window.location.pathname;
  console.log("Current path:", path);

  switch (path) {
    case "/":
    case "/index.html":
      authLinkHandler();
      displayAllListingsHandler();

      break;
    case "/listing/":
    case "/listing.html":
      authLinkHandler();

      // displaySingleListingHandler();
      break;
    case "/register/":
    case "/register/index.html":
      registerFormHandler();
      break;
    case "/login/":
    case "/login/index.html":
      loginFormHandler();
      break;
    case "/profile/":
    case "/profile/index.html":
      authLinkHandler();

      break;
    case "/about/":
    case "/about/index.html":
      authLinkHandler();

      break;
    default:
  }
}

route();
