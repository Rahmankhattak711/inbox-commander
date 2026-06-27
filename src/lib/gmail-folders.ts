export type GmailFolderId =
  | "spam"
  | "important"
  | "snoozed"
  | "starred"
  | "purchases";

export const GMAIL_FOLDER_QUERIES: Record<GmailFolderId, string> = {
  spam: "in:spam",
  important: "is:important",
  starred: "is:starred",
  snoozed: "label:Snoozed",
  purchases: "category:purchases",
};

export type GmailTab =
  | "sent"
  | "drafts"
  | "trash"
  | GmailFolderId;

export function tabFromParam(param: string | null): GmailTab {
  if (
    param === "drafts" ||
    param === "trash" ||
    param === "spam" ||
    param === "important" ||
    param === "snoozed" ||
    param === "starred" ||
    param === "purchases"
  ) {
    return param;
  }
  return "sent";
}

export function isGmailFolderTab(tab: GmailTab): tab is GmailFolderId {
  return tab in GMAIL_FOLDER_QUERIES;
}

export const GMAIL_TAB_META: Record<
  GmailTab,
  { title: string; description: string; emptyLabel: string }
> = {
  sent: {
    title: "Sent Emails",
    description: "View and audit your sent emails.",
    emptyLabel: "No Sent Emails Found",
  },
  drafts: {
    title: "Drafts",
    description: "Create, review, and send saved drafts.",
    emptyLabel: "No Drafts Found",
  },
  trash: {
    title: "Trash",
    description: "View trashed emails and restore or delete them.",
    emptyLabel: "Trash is Empty",
  },
  spam: {
    title: "Spam",
    description: "Review messages flagged as spam.",
    emptyLabel: "No Spam Messages",
  },
  important: {
    title: "Important",
    description: "Messages marked as important.",
    emptyLabel: "No Important Messages",
  },
  snoozed: {
    title: "Snoozed",
    description: "Messages you have snoozed.",
    emptyLabel: "No Snoozed Messages",
  },
  starred: {
    title: "Starred",
    description: "Messages you have starred.",
    emptyLabel: "No Starred Messages",
  },
  purchases: {
    title: "Purchases",
    description: "Order confirmations and purchase receipts from Gmail.",
    emptyLabel: "No Purchase Emails Found",
  },
};
