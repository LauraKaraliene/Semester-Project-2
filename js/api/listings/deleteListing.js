import { listingsUrl } from "../../constants/api.js";
import { getToken } from "../../utils/helpers/token.js";
import { getAPIKey } from "../authorization/apiKey.js";

export async function deleteListing(id) {
  const token = getToken();
  const apiKey = getAPIKey(); // Retrieve the API key

  console.log("Token:", token);
  console.log("API Key:", apiKey);

  if (!token) {
    throw new Error("You must be logged in to delete listings");
  }

  if (!apiKey) {
    throw new Error("API key is missing");
  }

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-api-key": apiKey,
    },
  };

  const deleteUrl = `${listingsUrl}/${id}`;
  const response = await fetch(deleteUrl, options);

  console.log("Response Status:", response.status); // Log the status code
  console.log("Response OK:", response.ok); // Log if the response was OK
  console.log("Response Headers:", response.headers); // Log response headers

  if (!response.ok) {
    const errorMessage = await response.text(); // Capture and log the response body text for error messages
    console.error("Response Error Message:", errorMessage);

    if (response.status === 401) {
      throw new Error("Unauthorized: Please log in again.");
    }
    throw new Error("Failed to delete the listing");
  }
}
