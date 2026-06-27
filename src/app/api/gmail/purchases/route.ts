import { getAuthenticatedGmailTenant } from "@/lib/corsair-auth";
import { buildPurchaseAnalytics } from "@/lib/gmail-purchases-analytics";
import { listGmailMessagesByQuery } from "@/lib/gmail-list-messages";
import { NextResponse } from "next/server";
import { getErrorMessage, getErrorStatus, requireSession } from "../../utils";

const PURCHASES_QUERY = "category:purchases";

export async function GET() {
  const auth = await requireSession();
  if ("response" in auth) return auth.response;

  try {
    const tenant = await getAuthenticatedGmailTenant(auth.userId);
    const emails = await listGmailMessagesByQuery(
      tenant,
      PURCHASES_QUERY,
      50,
    );
    const analytics = buildPurchaseAnalytics(
      emails.filter(Boolean) as Parameters<typeof buildPurchaseAnalytics>[0],
    );

    return NextResponse.json(
      { success: true, emails, analytics },
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
