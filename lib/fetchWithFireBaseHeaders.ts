
import { getAuthIdToken, installations, auth} from "./firebaseConfig";
import {getToken} from "firebase/installations";
export async function fetchWithFirebaseHeaders(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(options.headers || {});

  const [authIdToken, installationToken] = await Promise.all([
    getAuthIdToken(),
    getToken(installations),
  ]);

  headers.append("Firebase-Instance-ID-Token", installationToken);

  if (authIdToken) {
    headers.append("Authorization", `Bearer ${authIdToken}`);
  }

  const newOptions: RequestInit = {
    ...options,
    headers,
  };

  return fetch(url, newOptions);
}
