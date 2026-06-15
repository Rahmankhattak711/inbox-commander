import { setupCorsair } from "corsair";
import { corsair } from "../../corsair";
import { prisma } from "./prisma";

const GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";

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
    },
  });
}

async function syncUserGoogleTokens(userId: string) {
  const account = await prisma.account.findFirst({
    where: { userId, providerId: "google" },
  });

  if (!account?.accessToken) {
    throw new Error(
      "Google account is not connected. Sign in with Google to continue.",
    );
  }

  if (
    account.scope &&
    !account.scope.includes(GOOGLE_CALENDAR_SCOPE)
  ) {
    throw new Error(
      "Google Calendar access is not granted. Sign out and sign in again to allow calendar permissions.",
    );
  }

  await setupCorsair(corsair, {
    tenantId: userId,
    credentials: {
      googlecalendar: {
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
  await syncUserGoogleTokens(userId);
  return corsair.withTenant(userId);
}
