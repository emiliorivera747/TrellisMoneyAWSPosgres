import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server"; 
import { getPrismaError } from "@/utils/api-helpers/prisma/getPrismaErrorMessage";


export const handlePrismaErrorWithCode = (error: Prisma.PrismaClientKnownRequestError) => {
    return NextResponse.json(
      { message: getPrismaError(error.code) },
      { status: 500 }
    );
  };
  
export const isPrismaError = (error: unknown) => {
    return (
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientUnknownRequestError ||
      error instanceof Prisma.PrismaClientValidationError ||
      error instanceof Prisma.PrismaClientInitializationError
    );
  };
  
export const handlePrismaErrorWithNoCode = (error: Prisma.PrismaClientUnknownRequestError) => {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  
export const isPrismaErrorWithCode = (error: unknown) => {
    return error instanceof Prisma.PrismaClientKnownRequestError;
}