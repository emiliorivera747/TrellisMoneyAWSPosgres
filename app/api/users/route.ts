import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticateUser } from "@/utils/api-helpers/authenticateUser";
import {
  recordSchema,
  RecordSchema,
} from "@/features/auth/schemas/formSchemas";

import { handleZodError } from "@/utils/api-helpers/handleZodErrors";
const getNameFromBody = (body: RecordSchema) =>
  body?.record?.raw_user_meta_data?.name || body?.record?.email || "none";

const getEmailVerifiedFromBody = (body: RecordSchema) =>
  body?.record?.raw_user_meta_data?.email_verified || false;

const userAlreadyExistsError = () =>
  NextResponse.json(
    { status: "error", message: "User already exists" },
    { status: 409 }
  );

const parseRecord = (body: RecordSchema) => {
  const { email, id } = body?.record
    ? body.record
    : { email: "none", id: "none" };
  const name = getNameFromBody(body);
  const email_verified = getEmailVerifiedFromBody(body);
  return { email, id, name, email_verified };
};

/**
 *
 * @route POST /api/users
 * @desc Register a new user
 * @access Public
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { status: "error", message: "Invalid request body" },
        { status: 400 }
      );
    }
    recordSchema.parse(body);
    console.log("BODY:", body);

    const { email, id, name, email_verified } = parseRecord(body);
    console.log("PARSED RECORD:", email, id, name, email_verified);

    const user = await prisma.user.findFirst({
      where: { OR: [{ email }, { user_id: id }] },
    });

    console.log("USER:", user);

    if (user) return userAlreadyExistsError();

    console.log("CREATING USER:", name, email, id, email_verified);

    const newUser = await prisma.user.create({
      data: { name, email, user_id: id, email_verified },
    });

    console.log("NEW USER:", newUser);
    return NextResponse.json(
      { status: "success", message: "User created", user: newUser },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    if (err instanceof z.ZodError) return handleZodError(err);
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
    recordSchema.parse(body);

    const record = body.record;

    const { email, id } = record;
    const name = getNameFromBody(body);

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
