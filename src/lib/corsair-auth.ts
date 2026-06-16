import { setupCorsair } from "corsair";
import { corsair } from "../../corsair";
import { prisma } from "./prisma";

const GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";
const GOOGLE_GMAIL_SCOPE = "https://www.googleapis.com/auth/gmail.compose";

async function ensureIntegrationCredentials() {
  const envClientId = process.env.GOOGLE_CLIENT_ID;
  const envClientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!envClientId || !envClientSecret) {
    throw new Error("Google OAuth credentials are not configured.");
  }

  await setupCorsair(corsair, {
    credentials: {
      googlecalendar: {
        client_id: envClientId,
        client_secret: envClientSecret,
      },
      gmail: {
        client_id: envClientId,
        client_secret: envClientSecret,
      },
    },
  });
}

async function syncUserGoogleTokens(
  userId: string,
  plugin: "googlecalendar" | "gmail",
  requiredScope?: string,
) {
  const account = await prisma.account.findFirst({
    where: { userId, providerId: "google" },
  });

  if (!account?.accessToken) {
    throw new Error(
      "Google account is not connected. Sign in with Google to continue.",
    );
  }

  if (
    requiredScope &&
    account.scope &&
    !account.scope.includes(requiredScope)
  ) {
    throw new Error(
      `Google ${plugin === "gmail" ? "Gmail" : "Calendar"} access is not granted. Sign out and sign in again to allow ${plugin === "gmail" ? "Gmail" : "Calendar"} permissions.`,
    );
  }

  await setupCorsair(corsair, {
    tenantId: userId,
    credentials: {
      [plugin]: {
        access_token: account.accessToken,
        ...(account.refreshToken
          ? { refresh_token: account.refreshToken }
          : {}),
      },
    },
  });
}

export async function getAuthenticatedCorsairTenant(userId: string) {
  await ensureIntegrationCredentials();
  await syncUserGoogleTokens(userId, "googlecalendar", GOOGLE_CALENDAR_SCOPE);
  return corsair.withTenant(userId);
}

export async function getAuthenticatedGmailTenant(userId: string) {
  await ensureIntegrationCredentials();
  await syncUserGoogleTokens(userId, "gmail", GOOGLE_GMAIL_SCOPE);
  return corsair.withTenant(userId);
}
