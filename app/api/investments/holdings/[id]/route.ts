import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/protected";
import {
  SuccessResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  return withAuth(req, async (request, user) => {
    const { id } = await params;
    try {
    } catch (error) {}
  });
}
