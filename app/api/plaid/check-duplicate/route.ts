import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
  try {
    const { accounts, institution} = await req.json();

    let isDuplicate = false;

    // Check if the institution exists
    const institutionExists = await prisma.item.findUnique({
      where: { item_id: institution.institution_id },
    });

    

    return NextResponse.json({message: "Institution already exists", isDuplicate: isDuplicate}, { status: 400 });
  } catch (error) {
    const errorMessage = error.message || "An error occurred";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
