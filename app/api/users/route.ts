import {prisma} from '@/lib/prisma';
import { NextResponse } from "next/server";
import {hash} from 'bcrypt';
import {z} from 'zod';

import { authAdmin } from "@/lib/firebaseAdmin";
import type { NextRequest } from "next/server";

const userSchema = z.object({
    name: z.string(),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    userId: z.string().min(1, "User ID is required")
});


/**
 * 
 * @param req 
 * @returns 
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log(body);
        
        const {name, email, userId} = userSchema.parse(body);

        //Check if user already exists
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        //If user exists, return error
        if(user) {
            return NextResponse.json({status: 'error', message: 'User already exists'}, {status: 409});
        }
  
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                userId,
            }
        });

        return NextResponse.json({status: 'success', message: 'User created', user: newUser}, {status: 201});
    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json({status: 'error', message: err.errors}, {status: 400});
        }
        console.log(err);
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get("authorization");
    const idToken = authHeader ? authHeader.split("Bearer ")[1] : null;
  
    if (!idToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    try {
      const decodedToken = await authAdmin.verifyIdToken(idToken);
      const userId = decodedToken.uid;
  
      // Your protected logic here
      return NextResponse.json({ message: "Protected data", userId });
    } catch (error) {
      console.error("Token verification failed", error);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

