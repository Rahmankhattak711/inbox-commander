import { getSession } from "@/lib/server";
import { NextResponse } from "next/server";

export function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Failed to handle Google Calendar request";
}

export function getErrorStatus(error: unknown) {
  const message = getErrorMessage(error);
  if (message.includes("Unauthorized") || message.includes("not connected")) {
    return 401;
  }
  if (message.includes("not granted") || message.includes("not configured")) {
    return 403;
  }
  return 500;
}

export async function requireSession() {
  const session = await getSession();

  if (!session?.user) {
    return {
      response: NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      ),
    };
  }

  return { userId: session.user.id };
}
