import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { validateSession } from "@/utils/authHelper";
import { authAdmin } from "@/config/firebaseAdmin";

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
    return NextResponse.json({ message: "Protected data", user });
  } catch (error: unknown) {
    // console.error("Token verification failed", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE() {
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

    if (!user) {
      return NextResponse.json(
        { status: "error", message: "User does not exist" },
        { status: 404 }
      );
    }

    await authAdmin.deleteUser(userId ? userId : "");

    await prisma.user.delete({
      where: {
        userId,
      },
    });

    return NextResponse.json(
      { status: "success", message: "User deleted" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Server Error", error: err, status: "error" },
      { status: 500 }
    );
  }
}
