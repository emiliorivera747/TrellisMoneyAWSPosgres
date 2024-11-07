import {prisma} from '@/lib/prisma';
import { NextResponse } from "next/server";
import {hash} from 'bcrypt';
import {z} from 'zod';

import { authAdmin } from "@/lib/firebaseAdmin";
import type { NextRequest } from "next/server";

const userSchema = z.object({
    name: z.string(),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {name, email, password} = userSchema.parse(body);

        //Check if user already exists
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(user) {
            return NextResponse.json({status: 'error', message: 'User already exists'}, {status: 409});
        }
        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });
        const {password: newUserPassword, ...newUserWithoutPassword} = newUser;
        return NextResponse.json({status: 'success', message: 'User created', user: newUserWithoutPassword}, {status: 201});
    } catch (err) {
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