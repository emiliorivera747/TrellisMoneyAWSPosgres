import { Prisma } from '@/app/generated/prisma/client'
import { NextResponse } from "next/server";
import { getPrismaError } from "@/utils/api-helpers/errors/getPrismaErrorMessage";

export const handlePrismaErrorWithCode = (
  error: Prisma.PrismaClientKnownRequestError
) => {
  return NextResponse.json(
    {
      code: getPrismaError(error.code),
      meta: error.meta,
      message: error.message,
    },

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

export const handlePrismaErrorWithNoCode = (
  error:
    | Prisma.PrismaClientUnknownRequestError
    | Prisma.PrismaClientValidationError
    | Prisma.PrismaClientInitializationError
) => {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return NextResponse.json(
      { message: error.message, code: error.errorCode },
      { status: 400 }
    );
  }
  return NextResponse.json({ message: error.message }, { status: 500 });
};

export const isPrismaErrorWithCode = (error: unknown) => {
  return error instanceof Prisma.PrismaClientKnownRequestError;
};
