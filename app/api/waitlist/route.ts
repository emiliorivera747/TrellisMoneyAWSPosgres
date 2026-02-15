import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/drizzle/db";
import { waitlist } from "@/drizzle/schema";
import { handleZodError } from "@/utils/api-helpers/errors/handleZodErrors";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

/**
 * Add an email to the waitlist
 *
 * @route POST /api/waitlist
 * @access Public
 */
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email } = waitlistSchema.parse(body);

    await db.insert(waitlist).values({ email }).onConflictDoNothing();

    return NextResponse.json(
      { status: "success", message: "You've been added to the waitlist!" },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) return handleZodError(err);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
};
