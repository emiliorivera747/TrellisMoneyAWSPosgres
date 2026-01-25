import { API_URL } from "@/utils/global-variables/globals";

/**
 * Represents the API response for checking if a user is subscribed.
 * @export
 * @typedef {Object} isUserSubscribedApiResponse
 */
export type isUserSubscribedApiResponse = {
  /**
   * Indicates whether the user is subscribed.
   * @type {boolean}
   * @memberof isUserSubscribedApiResponse
   */
  subscribed: boolean;

  /**
   * The status of the API response.
   * @type {"success" | "fail" | "error"}
   * @memberof isUserSubscribedApiResponse
   */
  status: "success" | "fail" | "error";
};

/**
 * Asynchronously checks if the user is subscribed by fetching the subscription status
 * from the server.
 *
 * @returns {Promise<any>} A promise that resolves to the subscription status in JSON format.
 * @throws {Error} If the fetch request fails or the response is not OK.
 */
const isUserSubscribed = async (): Promise<isUserSubscribedApiResponse> => {
  const res = await fetch(`${API_URL}/subscription/status`);
  if (!res.ok)
    throw new Error("There was an error fetching the subscription status");
  return res.json();
};

const subscriptionService = {
  isUserSubscribed,
};

export default subscriptionService;
