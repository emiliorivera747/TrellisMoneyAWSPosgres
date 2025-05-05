import { NextResponse, NextRequest } from "next/server";

export function handleMissingData(accounts: any, holdings: any, securities: any) {
    if (!accounts) {
      return NextResponse.json(
        {
          message: "No accounts found.",
        },
        { status: 404 }
      );
    }
    if (!holdings) {
      return NextResponse.json(
        {
          message: "No holdings found.",
        },
        { status: 404 }
      );
    }
    if (!securities) {
      return NextResponse.json(
        {
          message: "No securities found.",
        },
        { status: 404 }
      );
    }
  }
  
  
  