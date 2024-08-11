import { registerUser } from "../../api/authorization/register.js";
import { messageForUser } from "../../ui/messageForUser.js";
import { getAPIKey } from "../../api/authorization/apiKey.js";
// import * as utils from "../../utils/storage/storage.js";
import { save } from "../../utils/storage/storage.js";

export function registerFormHandler() {
  const form = document.querySelector("#registerForm");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const avatarUrl = document.getElementById("avatarUrl").value;
    const avatarAlt = document.getElementById("avatarAlt").value;

    // Validate Avatar: Alt requires URL
    if (avatarAlt && !avatarUrl) {
      alert("Avatar Alt Text requires Avatar URL to be set.");
      return;
    }

    try {
      await registerForm(event);
      await getAPIKey();
    } catch (error) {
      console.error("Error during registration or API key retrieval:", error);
    }
  });
}

async function registerForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const entries = formData.entries();
  const userDetails = Object.fromEntries(entries);

  const profile = {
    name: userDetails.name,
    email: userDetails.email,
    password: userDetails.password,
    bio: userDetails.bio || "",
    avatar: userDetails.avatarUrl
      ? {
          url: userDetails.avatarUrl,
          alt: userDetails.avatarAlt || "",
        }
      : undefined,
  };

  try {
    const registrationResponse = await registerUser(profile);
    console.log("Registration response:", registrationResponse);

    const token = registrationResponse.token;

    if (token) {
      save("token", token); // Save token
      console.log("Token saved:", token);
    }

    messageForUser("#message", "success", "You are registered. Please login!");

    // // Redirect to login page after 3 seconds
    // setTimeout(() => {
    //   window.location.href = "/login"; // Adjust the path to your actual login page
    // }, 3000);

    form.reset();
  } catch (error) {
    console.log("Error during registration:", error);
    messageForUser("#message", "danger", error.message || "Registration failed. Please try again.");
  }
}
