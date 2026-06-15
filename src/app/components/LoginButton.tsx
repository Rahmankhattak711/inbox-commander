"use client";

import { authClient } from "@/lib/auth-client";

export default function LoginButton() {
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Continue with Google
      </button>
    </>
  );
}
