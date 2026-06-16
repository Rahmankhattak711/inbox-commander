import { CreateGmailDraftPayload } from "@/types";
export async function createGmailDraft({
  raw,
  threadId,
}: CreateGmailDraftPayload) {
  const response = await fetch("/api/gmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      raw,
      threadId,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to create Gmail draft");
  }

  return result;
}

export async function deleteGmailDraft({
  id,
  threadId = "primary",
}: {
  id: string;
  threadId?: string;
}) {
  const params = new URLSearchParams({ id, threadId });
  const response = await fetch(`/api/gmail?${params}`, {
    method: "DELETE",
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to delete Gmail draft");
  }

  return result;
}

export async function getGmailDrafts() {
  const response = await fetch("/api/gmail", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to fetch Gmail drafts");
  }

  return result;
}
