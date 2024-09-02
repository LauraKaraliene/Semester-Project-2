import { listingsUrl } from "../../constants/api.js";
import { headers } from "../authorization/headers.js";

export async function deleteListing(id) {
  const options = {
    method: "DELETE",
    headers: headers(), // Use the centralized headers function
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
