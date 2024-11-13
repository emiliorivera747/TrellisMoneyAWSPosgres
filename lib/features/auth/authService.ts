const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/auth`;

/**
 * Authenticate with the backend API
 */
const authenticate = async (idToken: string ) => {
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
        Authorization: `Bearer ${idToken}`,
        },
    });
    return response;
}

const authService = {
    authenticate,
}

export default authService;