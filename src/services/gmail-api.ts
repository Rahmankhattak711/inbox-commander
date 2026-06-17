export async function getSentEmails() {
  const response = await fetch("/api/gmail", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to fetch sent emails");
  }

  return result;
}

export async function sendDirectEmail({
  raw,
  threadId,
}: {
  raw: string;
  threadId?: string;
}) {
  const response = await fetch("/api/gmail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ raw, threadId }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to send email");
  }

  return result;
}

