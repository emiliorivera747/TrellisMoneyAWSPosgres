import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authAdmin } from "@/config/firebaseAdmin";
import type { NextRequest } from "next/server";
import { cookies, headers } from "next/headers";
import { validateSession } from "@/utils/authHelper";

const userSchema = z.object({
  name: z.string(),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  userId: z.string().min(1, "User ID is required"),
});

/**
 *
 * @param req
 * @returns
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // console.log(body);

    const { name, email, userId } = userSchema.parse(body);

    //Check if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    //If user exists, return error
    if (user) {
      return NextResponse.json(
        { status: "error", message: "User already exists" },
        { status: 409 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        userId,
      },
    });

    const cookieStore = await cookies();

    // Get the Authorization header
    const headersList = await headers();
    const authorization = headersList.get("Authorization");

    if (authorization?.startsWith("Bearer ")) {
      const idToken = authorization.split("Bearer ")[1];
      const decodedToken = await authAdmin.verifyIdToken(idToken);

      if (decodedToken) {
        // Generate session cookie
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const sessionCookie = await authAdmin.createSessionCookie(idToken, {
          expiresIn,
        });
        const options = {
          name: "session",
          value: sessionCookie,
          maxAge: expiresIn,
          httpOnly: true,
          secure: true,
        };

        // Add the cookie to the browser
        cookieStore.set(options);
      }
    }
    return NextResponse.json(
      { status: "success", message: "User created", user: newUser },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { status: "error", message: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

/**
 * 
 * @returns 
 */
export async function GET() {
  try {
    const sessionValidation = await validateSession();
  
    if (!sessionValidation.isValid) {
      return NextResponse.json(
        { error: "Unauthorized", isLogged: sessionValidation.isValid },
        { status: sessionValidation.status }
      );
    }
    const users = await prisma.user.findMany();
    return NextResponse.json({ status: "success", users }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ message: "Server Error", staus:"error"}, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const sessionValidation = await validateSession();
  
    if (!sessionValidation.isValid) {
      return NextResponse.json(
        { error: "Unauthorized", isLogged: sessionValidation.isValid },
        { status: sessionValidation.status }
      );
    }
    const body = await req.json();

    const { name, email, userId } = userSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { status: "error", message: "User does not exist" },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(
      { status: "success", message: "User updated", user: updatedUser },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { status: "error", message: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

