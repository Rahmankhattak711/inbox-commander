export type InboxPriority = "urgent" | "important" | "routine";

export type InboxTriageInput = {
  id: string;
  subject: string;
  from: string;
  snippet: string;
};

export type InboxTriageItem = {
  id: string;
  priority: InboxPriority;
  summary: string;
  reason: string;
};

export type InboxTriageResponse = {
  source: "ai" | "rules";
  triage: InboxTriageItem[];
};
