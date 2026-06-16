import { getAuthenticatedGmailTenant } from "@/lib/corsair-auth";
import { NextResponse } from "next/server";
import { getErrorMessage, getErrorStatus, requireSession } from "../utils";

type CreateDraftBody = {
  raw?: string;
  threadId?: string;
};

export async function POST(request: Request) {
  const auth = await requireSession();

  if ("response" in auth) {
    return auth.response;
  }

  try {
    const body = (await request.json()) as CreateDraftBody;

    if (!body.raw) {
      return NextResponse.json(
        { success: false, error: "Missing required raw payload" },
        { status: 400 },
      );
    }

    const tenant = await getAuthenticatedGmailTenant(auth.userId);

    const draft = await tenant.gmail.api.drafts.create({
      userId: "me",
      draft: {
        message: {
          raw: body.raw,
          ...(body.threadId ? { threadId: body.threadId } : {}),
        },
      },
    });

    return NextResponse.json(
      { success: true, draft },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: getErrorMessage(error) },
      { status: getErrorStatus(error) },
    );
  }
}

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
      const result = await tenant.gmail.api.drafts.list({
        userId: "me",
      });
      return NextResponse.json(
        {
          success: true,
          drafts: result.drafts || [],
        },
        {
          status: 200,
        },
      );
    }

    const message = await tenant.gmail.api.drafts.get({
      userId: "me",
      id,
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

export async function DELETE(request: Request) {
  const auth = await requireSession();

  if ("response" in auth) {
    return auth.response;
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required 'id' parameter for deletion.",
        },
        {
          status: 400,
        },
      );
    }

    const tenant = await getAuthenticatedGmailTenant(auth.userId);
    await tenant.gmail.api.drafts.delete({
      userId: "me",
      id,
    });

    return NextResponse.json(
      {
        success: true,
        message: `Draft ${id} successfully deleted.`,
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
