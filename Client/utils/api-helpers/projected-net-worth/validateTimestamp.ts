import { NextResponse } from "next/server";

/**
 * Checks whether the timestamp exists or not.
 *
 * @param timestamp
 * @returns
 */
export function validateTimestamp(timestamp: any) {
  if (!timestamp) return NextResponse.json({ message: "No timestamp found" }, { status: 404 });
}
