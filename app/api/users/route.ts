import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { withAuth } from "@/lib/protected";
import {
  recordSchema,
  RecordSchema,
} from "@/features/auth/schemas/formSchemas";

import { handleZodError } from "@/utils/api-helpers/errors/handleZodErrors";
import {
  getUserByEmailOrId,
  createUserWithDetails,
  getAllUsers,
  getUserByEmail,
  updateUserByEmail,
  getUserById,
  deleteUserById,
} from "@/utils/drizzle/user/user";

const getNameFromBody = (body: RecordSchema) =>
  body?.record?.raw_user_meta_data?.name || body?.record?.email || "none";

const getEmailVerifiedFromBody = (body: RecordSchema) =>
  body?.record?.raw_user_meta_data?.email_verified || false;

const getPhoneVerifiedFromBody = (body: RecordSchema) =>
  body?.record?.raw_user_meta_data?.phone_verified || false;

const userAlreadyExistsError = () =>
  NextResponse.json(
    { status: "error", message: "User already exists" },
    { status: 409 }
  );

const parseRecord = (body: RecordSchema) => {
  const { email, id, phone } = body?.record
    ? body.record
    : { email: "none", id: "none" };
  const name = getNameFromBody(body);
  const email_verified = getEmailVerifiedFromBody(body);
  const phone_verified = getPhoneVerifiedFromBody(body);
  return { email, id, name, email_verified, phone, phone_verified };
};

/**
 * Register a new user
 *
 * @route POST /api/users
 * @desc Register a new user
 * @access Public
 */
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    /**
     * Validate the user schema
     */
    recordSchema.parse(body);
    const { email, id, name, email_verified, phone, phone_verified } =
      parseRecord(body);

    /**
     * Does the User already exist?
     */
    const existingUser = await getUserByEmailOrId(email, id);
    if (existingUser) return userAlreadyExistsError();

    /**
     * You've gotten this far. Therefore,
     * create the user.
     */
    const newUser = await createUserWithDetails({
      fullName: name,
      email,
      userId: id,
      emailVerified: email_verified,
      phone,
      phoneVerified: phone_verified,
    });

    return NextResponse.json(
      { status: "success", message: "User created", user: newUser },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) return handleZodError(err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};

/**
 * Get users
 * @returns
 */
export const GET = async (req: NextRequest) =>
  withAuth(req, async (req, user) => {
    try {
      const users = await getAllUsers();
      return NextResponse.json({ status: "success", users }, { status: 200 });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { message: "Server Error", status: "error", error: error },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { message: "Unknown Error", status: "error" },
        { status: 500 }
      );
    }
  });

/**
 *
 * @param req
 * @returns
 */
export const PUT = async (req: NextRequest) =>
  withAuth(req, async (req, user) => {
    try {
      const body = await req.json();
      recordSchema.parse(body);

      const record = body.record;

      const { email, id } = record;
      const name = getNameFromBody(body);

      const existingUser = await getUserByEmail(email);

      if (!existingUser) {
        return NextResponse.json(
          { status: "error", message: "User does not exist" },
          { status: 404 }
        );
      }

      const updatedUser = await updateUserByEmail(email, {
        fullName: name,
        userId: id,
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
  });

/**
 *
 * @route DELETE /api/users
 * @desc Delete a user
 * @access Protected
 */
export const DELETE = async (req: NextRequest) =>
  withAuth(req, async (req, user) => {
    try {
      const id = user.id;

      const userRecord = await getUserById(id);

      if (!userRecord) {
        return NextResponse.json(
          { status: "error", message: "User does not exist" },
          { status: 404 }
        );
      }

      await deleteUserById(id);

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
  });
