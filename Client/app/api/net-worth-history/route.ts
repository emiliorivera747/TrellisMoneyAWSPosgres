import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        

    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching net worth history data" },
            { status: 500 }
        );
        
    }
}