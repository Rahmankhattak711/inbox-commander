import { getAuthenticatedGmailTenant } from "@/lib/corsair-auth";
import { NextResponse } from "next/server";
import { getErrorMessage, getErrorStatus, requireSession } from "../../utils";

export async function GET(request: Request) {
  const auth = await requireSession();
  if ("response" in auth) return auth.response;

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const tenant = await getAuthenticatedGmailTenant(auth.userId);

    if (!id) {
      const result = await tenant.gmail.api.drafts.list({
        userId: "me",
        maxResults: 20,
      });

      const draftsList = result.drafts || [];
      const detailedDrafts = await Promise.all(
        draftsList.map(async (draft: any) => {
          try {
            const detail = await tenant.gmail.api.drafts.get({
              userId: "me",
              id: draft.id,
              format: "full",
            });
            return { ...detail.message, draftId: draft.id };
          } catch (e) {
            console.error("Failed to get draft details for", draft.id, e);
            return null;
          }
        })
      );

      return NextResponse.json({ success: true, drafts: detailedDrafts.filter(Boolean) }, { status: 200 });
    }

    const draft = await tenant.gmail.api.drafts.get({
      userId: "me",
      id,
      format: "full",
    });

    return NextResponse.json(
      { success: true, draft: { ...draft.message, draftId: id } },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: getErrorStatus(error) });
  }
}

type DraftBody = {
  raw?: string;
  threadId?: string;
};

export async function POST(request: Request) {
  const auth = await requireSession();
  if ("response" in auth) return auth.response;

  try {
    const body = (await request.json()) as DraftBody;

    if (!body.raw) {
      return NextResponse.json(
        { success: false, error: "Missing required payload: raw" },
        { status: 400 },
      );
    }

    const tenant = await getAuthenticatedGmailTenant(auth.userId);
    const result = await tenant.gmail.api.drafts.create({
      userId: "me",
      draft: {
        message: {
          raw: body.raw,
          ...(body.threadId ? { threadId: body.threadId } : {}),
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        draft: { ...result.message, draftId: result.id },
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
  if ("response" in auth) return auth.response;

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const tenant = await getAuthenticatedGmailTenant(auth.userId);

    if (!id) {
      return NextResponse.json({ success: false, error: "Draft ID is required to delete." }, { status: 400 });
    }

    const response = await tenant.gmail.api.drafts.delete({
      userId: "me",
      id: id,
    });

    return NextResponse.json({ success: true, data: response }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: getErrorStatus(error) });
  }
}
