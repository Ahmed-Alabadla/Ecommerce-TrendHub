import { refreshAccessToken } from "@/actions/auth";
import { getCookie } from "cookies-next/client";

export const getAccessToken = async () => {
  let token = getCookie("access_token");
  if (!token) {
    // Try to refresh the access token
    const refreshResult = await refreshAccessToken();

    if (refreshResult.error) {
      throw new Error("Failed to refresh access token: " + refreshResult.error);
    }
    // Get the new token after refresh
    token = getCookie("access_token");

    if (!token) {
      throw new Error("No access token found after refresh");
    }
  }
  return token;
};
