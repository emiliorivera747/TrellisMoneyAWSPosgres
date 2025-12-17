// lib/protected.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from "@/utils/supabase/server";

export async function withAuth(
  request: NextRequest,
  handler: (req: NextRequest, user: any) => Promise<NextResponse>
) {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return handler(request, user);
}