import type { getAuthenticatedGmailTenant } from "@/lib/corsair-auth";

type GmailTenant = Awaited<ReturnType<typeof getAuthenticatedGmailTenant>>;

export async function listGmailMessagesByQuery(
  tenant: GmailTenant,
  query: string,
  maxResults = 20,
) {
  const result = await tenant.gmail.api.messages.list({
    userId: "me",
    q: query,
    maxResults,
  });

  const messagesList = result.messages || [];
  const detailedMessages = await Promise.all(
    messagesList.map(async (msg: { id?: string }) => {
      if (!msg.id) return null;
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
    }),
  );

  return detailedMessages.filter(Boolean);
}
