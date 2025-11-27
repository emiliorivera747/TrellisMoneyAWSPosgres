import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/utils/api-helpers/supabase/getUser";


/**
 * GET /api/members 
 */
export async function GET(req: NextRequest): Promise<NextResponse>{
    try {

        return NextResponse.json({data: {}}, {status: 200})
    } catch (error) {

        const errorMessage = error instanceof Error ? error.message: "There was a server error";
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
          );
        }
    }
}