import {
  apiRequest,
} from "./apiClient";


export const getCurrentUser =
  async () => {

    return apiRequest(
      "/auth/me"
    );

  };