import { NextRequest, NextResponse } from "next/server";

type Entry = { count: number; resetAt: number };
const store = new Map<string, Entry>();

/**
 * Simple in-memory rate limiter.
 * NOTE: In a multi-instance / serverless deployment each instance has its own
 * store, so this provides best-effort protection per instance. For strict
 * enforcement across all instances use a shared store (e.g. Upstash Redis).
 *
 * @returns NextResponse 429 if the limit is exceeded, otherwise null.
 */
export function rateLimit(
  req: NextRequest,
  limit = 10,
  windowMs = 60_000
): NextResponse | null {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const key = `${req.nextUrl.pathname}:${ip}`;
  const now = Date.now();

  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (entry.count >= limit) {
    return NextResponse.json(
      { status: "error", message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  entry.count++;
  return null;
}
