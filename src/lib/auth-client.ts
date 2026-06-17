import { createAuthClient } from "better-auth/react";

const authBaseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

export const authClient = createAuthClient({
  baseURL:
    authBaseURL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:3000"),
});

export const { signIn, signUp, useSession } = authClient;
