import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticateUser } from "@/utils/api-helpers/authenticateUser";
import {
  recordSchema,
  RecordSchema,
} from "@/features/auth/schemas/formSchemas";
import { User } from "@/types/user";

const getNameFromBody = (body: RecordSchema) => {
  if (body?.record?.raw_user_meta_data?.name) {
    return body.record.raw_user_meta_data.name;
  } else if (body?.record?.email) {
    return body.record.email;
  } else {
    return "none";
  }
};

const getEmailVerifiedFromBody = (body: RecordSchema) => {
  if (body?.record?.raw_user_meta_data?.email_verified) {
    return body.record.raw_user_meta_data.email_verified;
  } else {
    return false;
  }
};


/**
 *
 * Register a new user
 *
 * @param req
 * @returns
 */
export async function POST(req: Request) {
  try {
    //Parse the request body
    const body = await req.json();
    console.log("body", body);

    /**
     * Validate the request body
     * @throws {z.ZodError} if the request body is invalid
     */
    recordSchema.parse(body);

    //Extract the email, id, name and emailVerified from the request body
    const { email, id } = body.record;
    const name = getNameFromBody(body);
    const emailVerified = getEmailVerifiedFromBody(body);

    //Check if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email,
        userId: id,
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
        userId: id,
        emailVerified,
      },
    });

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
