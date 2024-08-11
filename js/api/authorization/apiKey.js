export const apiKey = "";
import { get } from "../../utils/storage/get.js";
import { apiKeyUrl } from "../../constants/api.js";

export async function getAPIKey() {
  const token = get("token");

  if (!token) {
    console.warn("No token available, skipping API key retrieval.");
    return;
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
      console.log("API Key retrieved: ", data);
      return data;
    }

    console.error(await response.json());
    throw new Error("Failed to get API key");
  } catch (error) {
    console.error("Error occurred while fetching API Key:", error);
    throw error;
  }
}
