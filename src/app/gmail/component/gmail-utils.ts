export function decodeHtml(str: string) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export function getHeader(
  message: { payload?: { headers?: Array<{ name: string; value: string }> } },
  name: string,
) {
  const headers = message.payload?.headers || [];
  return (
    headers.find((h) => h.name.toLowerCase() === name.toLowerCase())?.value ??
    ""
  );
}

export function parseGmailMessage(message: {
  id?: string;
  draftId?: string;
  snippet?: string;
  internalDate?: string;
  payload?: { headers?: Array<{ name: string; value: string }> };
}) {
  const dateHeader = getHeader(message, "date");
  let dateStr = "";
  if (dateHeader) {
    dateStr = new Date(dateHeader).toLocaleDateString();
  } else if (message.internalDate) {
    dateStr = new Date(Number(message.internalDate)).toLocaleDateString();
  }

  return {
    id: message.draftId || message.id || "",
    messageId: message.id || "",
    subject: getHeader(message, "subject") || "(No Subject)",
    to: getHeader(message, "to") || "(No Recipient)",
    from: getHeader(message, "from") || "(No Sender)",
    date: dateStr,
    snippet: message.snippet
      ? decodeHtml(message.snippet)
      : "No preview available",
  };
}

export function buildRawEmail({
  to,
  subject,
  message,
}: {
  to: string;
  subject: string;
  message: string;
}) {
  const email = [
    `To: ${to}`,
    `Subject: ${subject}`,
    "Content-Type: text/plain; charset=utf-8",
    "",
    message,
  ].join("\n");

  return btoa(unescape(encodeURIComponent(email)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
