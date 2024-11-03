import {prisma} from '@/lib/prisma';
import { NextResponse } from "next/server";
import {hash} from 'bcrypt';
import {z} from 'zod';

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