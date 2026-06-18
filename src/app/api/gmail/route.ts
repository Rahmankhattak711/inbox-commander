import { getAuthenticatedGmailTenant } from "@/lib/corsair-auth";
import { NextResponse } from "next/server";
import { getErrorMessage, getErrorStatus, requireSession } from "../utils";

export async function GET(request: Request) {
  const auth = await requireSession();
  if ("response" in auth) {
    return auth.response;
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const tenant = await getAuthenticatedGmailTenant(auth.userId);

    if (!id) {
      const result = await tenant.gmail.api.messages.list({
        userId: "me",
        q: "is:sent",
      });
      const messagesList = result.messages || [];
      const detailedMessages = await Promise.all(
        messagesList.slice(0, 20).map(async (msg: any) => {
          try {
            return await tenant.gmail.api.messages.get({
              userId: "me",
              id: msg.id,
              format: "full",
            });
          } catch (e) {
            console.error("Failed to get message details for", msg.id, e);
            return null;
          }
        })
      );
      return NextResponse.json(
        {
          success: true,
          emails: detailedMessages.filter(Boolean),
        },
        {
          status: 200,
        },
      );
    }

    const message = await tenant.gmail.api.messages.get({
      userId: "me",
      id,
      format: "full",
    });

    return NextResponse.json(
      {
        success: true,
        message,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: getErrorMessage(error),
      },
      {
        status: getErrorStatus(error),
      },
    );
  }
}
