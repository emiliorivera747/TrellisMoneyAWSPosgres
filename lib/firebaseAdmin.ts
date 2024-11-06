import admin from "firebase-admin";
import serviceAccount from "@/trellis-money-auth.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const authAdmin = admin.auth();
