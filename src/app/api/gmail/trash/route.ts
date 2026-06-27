import { getAuthenticatedGmailTenant } from "@/lib/corsair-auth";
import { NextResponse } from "next/server";
import { getErrorMessage, getErrorStatus, requireSession } from "../../utils";

export async function GET() {
  const auth = await requireSession();
  if ("response" in auth) return auth.response;

  try {
    const tenant = await getAuthenticatedGmailTenant(auth.userId);

    const result = await tenant.gmail.api.messages.list({
      userId: "me",
      q: "in:trash",
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
          console.error("Failed to get trash message details for", msg.id, e);
          return null;
        }
      }),
    );

    return NextResponse.json(
      { success: true, emails: detailedMessages.filter(Boolean) },
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

export async function POST(request: Request) {
  const auth = await requireSession();
  if ("response" in auth) return auth.response;

  try {
    const body = (await request.json()) as { id?: string };
    const tenant = await getAuthenticatedGmailTenant(auth.userId);

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "Message ID is required to restore." },
        { status: 400 },
      );
    }

    const response = await tenant.gmail.api.messages.untrash({
      userId: "me",
      id: body.id,
    });

    return NextResponse.json({ success: true, message: response }, { status: 200 });
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
  if ("response" in auth) return auth.response;

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const tenant = await getAuthenticatedGmailTenant(auth.userId);

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Message ID is required to delete permanently." },
        { status: 400 },
      );
    }

    await tenant.gmail.api.messages.delete({
      userId: "me",
      id,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: getErrorMessage(error) },
      { status: getErrorStatus(error) },
    );
  }
}
