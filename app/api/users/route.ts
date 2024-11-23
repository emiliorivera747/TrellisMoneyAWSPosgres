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
    // const record = body.record;
    // const { email, id } = record;
    // const name = record.raw_user_meta_data?.name
    //   ? record.raw_user_meta_data.name
    //   : email;

    // console.log("Name", name);
    // const emailVerified = record?.raw_user_meta_data?.email_verified
    //   ? record.raw_user_meta_data.email_verified
    //   : false;
    // console.log(emailVerified);

    // //Check if user already exists
    // const user = await prisma.user.findUnique({
    //   where: {
    //     email,
    //     userId: id,
    //   },
    // });

    // console.log("user", user);

    // //If user exists, return error
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
    //     emailVerified,
    //   },
    // });

    // console.log("newUser", newUser);

    // return NextResponse.json(
    //   { status: "success", message: "User created", user: newUser },
    //   { status: 201 }
    // );
    return NextResponse.json(
      { status: "success", message: "User created", user: "WEB HOOK WORKING!" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
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

    const { name, email, id } = userSchema.parse(body);

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
