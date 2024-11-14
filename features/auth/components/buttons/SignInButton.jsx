'use client'

import React from "react";
import Link from "next/link";

const SignInButton = () => {
    return (
        <div>
            <Link className="px-4 py-2 bg-blue-500 text-white border-none rounded cursor-pointer" href="/sign-in">Sign In</Link>
        </div>
    )
}

export default SignInButton