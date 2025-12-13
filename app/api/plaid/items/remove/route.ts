import { NextRequest, NextResponse } from "next/server";
import { ItemRemoveRequest } from "plaid"; // Adjust the import path based on your project structure



const request: ItemRemoveRequest = {
    access_token: "access-production-d8343d1c-50ee-45aa-8696-091cd58dceb2",
};

export async function POST(req: NextRequest) {
  try {
    const { item_id } = await req.json();


  } catch (error) {}
}
