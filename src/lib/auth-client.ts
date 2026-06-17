import { createAuthClient } from "better-auth/react";

const authBaseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

export const authClient = createAuthClient({
  baseURL: authBaseURL ?? "",
});

export const { signIn, signUp, useSession } = authClient;
