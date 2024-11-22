import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticateUser } from "@/utils/api-helpers/authenticateUser";

const userSchema = z.object({
  name: z.string(),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  id: z.number().min(1, "User ID is required"),
});

/**
 *
 * Register a new user
 *
 * @param req
 * @returns
 */
export async function POST(req: Request) {
  try {

    const body = await req.json();
    console.log(body);

    // const { name, email, id } = userSchema.parse(body);

    //Check if user already exists
    // const user = await prisma.user.findUnique({
    //   where: {
    //     email,
    //     id,
    //   },
    // });

    //If user exists, return error
    // if (user) {
    //   return NextResponse.json(
    //     { status: "error", message: "User already exists" },
    //     { status: 409 }
    //   );
    // }

    // const newUser = await prisma.user.create({
    //   data: {
    //     name,
    //     email,
    //     id,
    //   },
    // });

    // return NextResponse.json(
    //   { status: "success", message: "User created", user: newUser },
    //   { status: 201 }
    // );
    
    return NextResponse.json(
      { status: "success", message: "WEB HOOK WORKING" },
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
 * Get users
 * @returns
 */
export async function GET() {
  try {
    const result = await authenticateUser();
    if (result instanceof NextResponse) return result;
    const users = await prisma.user.findMany();
    return NextResponse.json({ status: "success", users }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Server Error", staus: "error", error: error },
        { status: 500 }
      );
    }
  }
}

export async function PUT(req: Request) {
  try {
    const result = await authenticateUser();
    if (result instanceof NextResponse) return result;
    const body = await req.json();

    const { name, email, id} = userSchema.parse(body);

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
        id,
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
