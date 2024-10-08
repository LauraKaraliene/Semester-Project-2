export const apiKey = "11f03af2-259f-4b8c-b18f-6a9a9bcf18d0";

import { get } from "../../utils/storage/get.js";
import { save } from "../../utils/storage/save.js";
import { apiKeyUrl } from "../../constants/api.js";

export async function getAPIKey() {
  const token = get("token");

  if (!token) {
    console.warn("No token available, skipping API key retrieval.");
    return null;
  }

  try {
    const response = await fetch(apiKeyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: "Test key",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const apiKey = data?.data?.key;

      if (apiKey) {
        save("apiKey", apiKey);
        return apiKey;
      } else {
        console.error("API key is missing in the response:", data);
      }
    } else {
      const errorResponse = await response.json();
      console.error("Failed to retrieve API key", errorResponse);
    }
  } catch (error) {
    console.error("Error occurred while fetching API Key:", error);
  }
  return null;
}

getAPIKey().then((key) => console.log("Stored API Key:", key));
