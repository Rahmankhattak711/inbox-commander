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

export async function getDrafts() {
  const response = await fetch("/api/gmail/drafts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to fetch drafts");
  }

  return result;
}

export async function createGmailDraft({
  raw,
  threadId,
}: {
  raw: string;
  threadId?: string;
}) {
  const response = await fetch("/api/gmail/drafts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ raw, threadId }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to create draft");
  }

  return result;
}

export async function sendGmailDraft({
  draftId,
}: {
  draftId: string;
}) {
  const response = await fetch("/api/gmail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ draftId }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to send draft");
  }

  return result;
}

export async function deleteGmailDraft({
  draftId,
}: {
  draftId: string;
}) {
  const response = await fetch(`/api/gmail/drafts?id=${draftId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to delete draft");
  }

  return result;
}

export async function deleteGmailEmail({
  emailId,
}: {
  emailId: string;
}) {
  const response = await fetch(`/api/gmail?id=${emailId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to delete email");
  }

  return result;
}

export async function getTrashEmails() {
  const response = await fetch("/api/gmail/trash", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to fetch trash");
  }

  return result;
}

export async function restoreGmailEmail({ emailId }: { emailId: string }) {
  const response = await fetch("/api/gmail/trash", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id: emailId }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to restore email");
  }

  return result;
}

export async function permanentlyDeleteGmailEmail({
  emailId,
}: {
  emailId: string;
}) {
  const response = await fetch(`/api/gmail/trash?id=${emailId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to permanently delete email");
  }

  return result;
}

export async function getGmailFolderEmails(folder: string) {
  const response = await fetch(`/api/gmail/folder?folder=${folder}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || `Failed to fetch ${folder} emails`);
  }

  return result;
}

export async function getGmailPurchases() {
  const response = await fetch("/api/gmail/purchases", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Failed to fetch purchases");
  }

  return result;
}
