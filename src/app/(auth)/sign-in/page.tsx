"use client"

import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md inset-shadow-2xs w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        <p className="text-center mb-4">
          Please sign in with your Google account to continue.
        </p>
        <button
          onClick={() => signIn('google')}
          className="btn w-full"
        >
          <Image src="/google.svg" alt="Instagram" width={20} height={20} />
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
