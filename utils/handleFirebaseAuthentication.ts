import authService from "@/features/auth/services/authService";

interface FirebaseResponse {
  success?: boolean | undefined;
  user?: any;
  error?: string | undefined;
}
/**
 * Handle Firebase Authentication
 *
 * @param firebaseReponse
 */
export const handleFirebaseAuthentication = async (
  firebaseReponse: FirebaseResponse | undefined
) => {
  if (!firebaseReponse) {
    return null;
  }
  if (firebaseReponse?.success) {
    const userCred = firebaseReponse.user;
    const idToken = await userCred?.user.getIdToken();
    const response = await authService.authenticate(idToken ? idToken : "");
    return response;
  }
};


