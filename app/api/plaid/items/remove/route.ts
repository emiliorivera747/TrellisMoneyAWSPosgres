import { NextRequest, NextResponse } from "next/server";
import { ItemRemoveRequest } from "plaid"; // Adjust the import path based on your project structure

export async function POST(req: NextRequest) {
  try {
    const { item_id } = await req.json();


  } catch (error) {}
}
