const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/users`;
import { fetchWithFirebaseHeaders } from '@/lib/fetchWithFireBaseHeaders';

/**
 * Fetch User by userId
 *
 * @param userId
 * @returns User
 */
const fetchUser = async (userId: string) => {
  const response = await fetchWithFirebaseHeaders(`${API_URL}/${userId}`);
  return response.json();
};

/**
 * Register User
 *
 * @param user
 * @returns User
 */
const registerUser = async (user: any) => {
  const response = await fetchWithFirebaseHeaders(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

/**
 * Check if user exists
 *
 * @param email
 * @returns boolean
 */
const userExists = async (email: String) => {
    const response = await fetchWithFirebaseHeaders(`${API_URL}/exists?email=${email}`);
    return response.json();
}

const userService = {
  fetchUser,
  registerUser,
  userExists,
};

export default userService;
