import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { validateSession } from "@/lib/authHelper";

export async function GET() {
    try {
      const sessionValidation = await validateSession();
  
      if (!sessionValidation.isValid) {
        return NextResponse.json(
          { error: "Unauthorized", isLogged: sessionValidation.isValid },
          { status: sessionValidation.status }
        );
      }
      const userId = sessionValidation.decodedClaims?.uid;
  
      const user = await prisma.user.findUnique({
        where: {
          userId,
        },
      });
      
      // Your protected logic here
      return NextResponse.json({ message: "Protected data", user});
    } catch (error: unknown) {
      // console.error("Token verification failed", error);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }