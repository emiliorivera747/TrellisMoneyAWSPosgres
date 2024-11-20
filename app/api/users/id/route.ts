import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {authenticateUser} from "@/utils/api-helpers/authenticateUser";


export async function GET() {
  try {
    const result = await authenticateUser();
    if (result instanceof NextResponse) return result;
    const userId = result?.id;
    const user = await prisma.user.findUnique({
      where: {
        userId: userId,
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
    const result = await authenticateUser();
    if (result instanceof NextResponse) return result;
    const userId = result?.id;
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
