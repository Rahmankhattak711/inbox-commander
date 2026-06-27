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
        maxResults: 20,
      });

      const messagesList = result.messages || [];
      const detailedMessages = await Promise.all(
        messagesList.map(async (msg: any) => {
          try {
            const detail = await tenant.gmail.api.messages.get({
              userId: "me",
              id: msg.id,
              format: "full",
            });
            return detail;
          } catch (e) {
            console.error("Failed to get message details for", msg.id, e);
            return null;
          }
        }),
      );

      return NextResponse.json(
        {
          success: true,
          emails: detailedMessages.filter(Boolean),
        },
        { status: 200 },
      );
    }

    const response = await tenant.gmail.api.messages.get({
      userId: "me",
      id,
      format: "full",
    });

    return NextResponse.json(
      {
        success: true,
        message: response.payload,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: getErrorMessage(error) },
      { status: getErrorStatus(error) },
    );
  }
}

export async function DELETE(request: Request) {
  const auth = await requireSession();
  if ("response" in auth) {
    return auth.response;
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const tenant = await getAuthenticatedGmailTenant(auth.userId);

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Message ID is required to delete." },
        { status: 400 },
      );
    }

    const response = await tenant.gmail.api.messages.trash({
      userId: "me",
      id: id,
    });

    return NextResponse.json(
      {
        success: true,
        message: response.payload,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: getErrorMessage(error) },
      { status: getErrorStatus(error) },
    );
  }
}
