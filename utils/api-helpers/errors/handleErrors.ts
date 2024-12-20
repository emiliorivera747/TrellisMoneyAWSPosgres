
import { NextResponse } from 'next/server';

export const handleOtherErrror = (error: unknown) => {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: String(error) }, { status: 500 });
    }
  };
  