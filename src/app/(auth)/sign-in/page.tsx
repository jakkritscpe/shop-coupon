"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log('session', session);
  console.log('status', status);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        console.error(result?.error)
      } else {
        router.push('/')
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md inset-shadow-2xs w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        {/* ถ้ามี session → แสดงปุ่ม Logout */}
        {session ? (
          <div className="space-y-4 text-center">
            <p className="mb-4">Welcome, {session.user?.email}</p>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="btn btn-error w-full"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <p className="text-center mb-4">
              Please sign in with your account to continue.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="input input-bordered w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Sign In
              </button>
            </form>

            <div className="divider">OR</div>

            <button
              onClick={() => signIn("google", { callbackUrl: "/", prompt: "select_account" })}
              className="btn w-full flex items-center justify-center gap-2"
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              Sign In with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
