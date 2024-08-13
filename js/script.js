import { loginFormHandler } from "./handlers/authorization/loginFormHandler.js";
import { registerFormHandler } from "./handlers/authorization/registerFormHandler.js";

function route() {
  const path = window.location.pathname;
  console.log(path);

  switch (path) {
    case "/":
    case "/index.html":
      // do something
      // getAPIKey();
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
      // do something
      break;
    case "/about/":
    case "/about/index.html":
      // do something
      break;
    case "/auctions/":
    case "/auctions/index.html":
      // do something
      break;
    default:
  }
}

route();
