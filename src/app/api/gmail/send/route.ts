import { getAuthenticatedGmailTenant } from "@/lib/corsair-auth";
import { NextResponse } from "next/server";
import { getErrorMessage, getErrorStatus, requireSession } from "../../utils";

type SendBody = {
  raw?: string;
  draftId?: string;
  threadId?: string;
};

export async function POST(request: Request) {
  const auth = await requireSession();

  if ("response" in auth) {
    return auth.response;
  }

  try {
    const body = (await request.json()) as SendBody;

    const tenant = await getAuthenticatedGmailTenant(auth.userId);

    if (body.draftId) {
      // Send existing draft
      const result = await tenant.gmail.api.drafts.send({
        userId: "me",
        id: body.draftId,
      });
      return NextResponse.json(
        { success: true, result },
        { status: 200 },
      );
    } else if (body.raw) {
      // Send email directly
      const result = await tenant.gmail.api.messages.send({
        userId: "me",
        raw: body.raw,
        ...(body.threadId ? { threadId: body.threadId } : {}),
      });
      return NextResponse.json(
        { success: true, result },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { success: false, error: "Missing required payload: draftId or raw" },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: getErrorMessage(error) },
      { status: getErrorStatus(error) },
    );
  }
}
