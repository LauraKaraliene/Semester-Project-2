import { listingsUrl } from "../../constants/api.js";
import { headers } from "../authorization/headers.js";

export async function deleteListing(id) {
  const options = {
    method: "DELETE",
    headers: headers(),
  };

  const deleteUrl = `${listingsUrl}/${id}`;
  const response = await fetch(deleteUrl, options);

  if (!response.ok) {
    const errorMessage = await response.text();
    console.error("Response Error Message:", errorMessage);

    if (response.status === 401) {
      throw new Error("Unauthorized: Please log in again.");
    }
    throw new Error("Failed to delete the listing");
  }
}
