'use client'

import React from "react";
import Link from "next/link";

const SignInButton = () => {
    return (
        <div>
            <Link className=" transition duration-300 px-[.94118rem] py-[0.6rem] rounded bg-primary-700 hover:bg-primary-900 text-white border-none cursor-pointer " href="/sign-in">Sign In</Link>
        </div>
    )
}

export default SignInButton