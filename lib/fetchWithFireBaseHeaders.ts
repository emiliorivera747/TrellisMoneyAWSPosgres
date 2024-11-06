
import { getAuthIdToken } from "./firebaseConfig";

export async function fetchWithFirebaseHeaders(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const authIdToken = await getAuthIdToken();
  const headers = new Headers(options.headers || {});

  if (authIdToken) {
    headers.append("Authorization", `Bearer ${authIdToken}`);
  }

  const newOptions: RequestInit = {
    ...options,
    headers,
  };

  return fetch(url, newOptions);
}
