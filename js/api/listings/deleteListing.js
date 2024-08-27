import { listingsUrl } from "../../constants/api.js";
import { getToken } from "../../utils/helpers/token.js";

export async function deleteListing(id) {
  const token = getToken();

  console.log("Token:", token);

  if (!token) {
    throw new Error("You must be logged in to delete listings");
  }

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const deleteUrl = `${listingsUrl}/${id}`;
  const response = await fetch(deleteUrl, options);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized: Please log in again.");
    }
    throw new Error("Failed to delete the listing");
  }
}
