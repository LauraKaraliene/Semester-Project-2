import { loginUser } from "../../api/authorization/login.js";
import { messageForUser } from "../../ui/messageForUser.js";
import * as utils from "../../utils/storage/storage.js";
import { getAPIKey } from "../../api/authorization/apiKey.js";

export function loginFormHandler() {
  const form = document.querySelector("#loginForm");
  form.addEventListener("submit", loginForm);
}

async function loginForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const entries = formData.entries();
  const userData = Object.fromEntries(entries);
  const fieldset = form.querySelector("fieldset");

  try {
    fieldset.disabled = true;
    const { accessToken, name, email } = await loginUser(userData);

    if (accessToken) {
      console.log("Saving accessToken:", accessToken);
      utils.save("token", accessToken);
      console.log("Saved accessToken:", localStorage.getItem("token"));
      utils.save("userName", name);
      utils.save("email", email);
      console.log(accessToken, name, email);

      // Retrieve the API key using the access token
      const apiKeyResponse = await getAPIKey();

      if (apiKeyResponse && apiKeyResponse.key) {
        console.log("Saving API key:", apiKeyResponse.key);

        utils.save("apiKey", apiKeyResponse.key);
        console.log("API Key saved:", apiKeyResponse.key);
      } else {
        console.warn("API Key not retrieved.");
      }

      messageForUser("#message", "success", "You are Logged in!");

      setTimeout(() => {
        window.location.href = "/index.html";
      }, 3000);

      form.reset();
    }
  } catch (error) {
    console.error("Login error:", error.message);
    messageForUser("#message", "danger", error.message);
  } finally {
    fieldset.disabled = false;
  }
}
