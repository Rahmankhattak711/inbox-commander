import { getAuthenticatedGmailTenant } from "@/lib/corsair-auth";
import {
  GMAIL_FOLDER_QUERIES,
  type GmailFolderId,
} from "@/lib/gmail-folders";
import { listGmailMessagesByQuery } from "@/lib/gmail-list-messages";
import { NextResponse } from "next/server";
import { getErrorMessage, getErrorStatus, requireSession } from "../../utils";

function isGmailFolderId(value: string): value is GmailFolderId {
  return value in GMAIL_FOLDER_QUERIES;
}

export async function GET(request: Request) {
  const auth = await requireSession();
  if ("response" in auth) return auth.response;

  try {
    const url = new URL(request.url);
    const folder = url.searchParams.get("folder");

    if (!folder || !isGmailFolderId(folder)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Valid folder is required: spam, important, snoozed, starred, or purchases.",
        },
        { status: 400 },
      );
    }

    const tenant = await getAuthenticatedGmailTenant(auth.userId);
    const emails = await listGmailMessagesByQuery(
      tenant,
      GMAIL_FOLDER_QUERIES[folder],
    );

    return NextResponse.json({ success: true, emails, folder }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: getErrorMessage(error) },
      { status: getErrorStatus(error) },
    );
  }
}
