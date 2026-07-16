"use client";

import { useMemo, useState } from "react";
import {
  useDeleteGmailEmail,
  useGmailFolder,
} from "@/hooks/useCreateGmailDraft";
import { useInboxTriage } from "@/hooks/useInboxTriage";
import type { GmailFolderId } from "@/lib/gmail-folders";
import { GMAIL_TAB_META } from "@/lib/gmail-folders";
import type { InboxPriority } from "@/types/inbox-triage";
import { type ParsedGmailMessage, parseGmailMessage } from "./gmail-utils";

const priorityRank: Record<InboxPriority, number> = {
  urgent: 0,
  important: 1,
  routine: 2,
};

const priorityStyles: Record<
  InboxPriority,
  { background: string; color: string }
> = {
  urgent: { background: "rgba(248,113,113,0.12)", color: "#fca5a5" },
  important: { background: "rgba(251,191,36,0.12)", color: "#fcd34d" },
  routine: {
    background: "rgba(107,128,80,0.16)",
    color: "var(--text-secondary)",
  },
};

export default function GmailFolder({ folder }: { folder: GmailFolderId }) {
  const { emails, isFetching, fetchError, refetch } = useGmailFolder(folder);
  const { deleteEmail, isDeleting } = useDeleteGmailEmail();
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  const meta = GMAIL_TAB_META[folder];

  const parsedEmails = useMemo<ParsedGmailMessage[]>(
    () =>
      emails.map((email: Parameters<typeof parseGmailMessage>[0]) =>
        parseGmailMessage(email),
      ),
    [emails],
  );

  const inboxMessages = useMemo(
    () =>
      parsedEmails.map(({ id, subject, from, snippet }) => ({
        id,
        subject,
        from,
        snippet,
      })),
    [parsedEmails],
  );
  const { triage, source, isTriageLoading, triageError, refetchTriage } =
    useInboxTriage(inboxMessages, folder === "inbox");

  const triageById = useMemo(
    () => new Map(triage.map((item) => [item.id, item])),
    [triage],
  );
  const displayedEmails = useMemo(() => {
    if (folder !== "inbox" || triage.length === 0) return parsedEmails;

    return [...parsedEmails].sort(
      (first, second) =>
        priorityRank[triageById.get(first.id)?.priority ?? "routine"] -
        priorityRank[triageById.get(second.id)?.priority ?? "routine"],
    );
  }, [folder, parsedEmails, triage.length, triageById]);
  const priorityCounts = useMemo(
    () => ({
      urgent: triage.filter((item) => item.priority === "urgent").length,
      important: triage.filter((item) => item.priority === "important").length,
    }),
    [triage],
  );

  const selectedEmail = useMemo(
    () =>
      displayedEmails.find((email) => email.id === selectedEmailId) ||
      displayedEmails[0] ||
      null,
    [displayedEmails, selectedEmailId],
  );
  const selectedTriage = selectedEmail
    ? triageById.get(selectedEmail.id)
    : undefined;

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-gradient-to-b from-[#101311] to-[#090b0a]">
      <header className="px-6 py-4 sm:px-8 flex justify-between items-center gap-4 shrink-0 border-b border-white/[0.08] bg-[#101311]/65 backdrop-blur-xl">
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          {folder === "inbox"
            ? "AI organizes incoming mail by urgency, then gives each message a clear next-step summary."
            : meta.description}
        </p>
        <button
          type="button"
          onClick={() => {
            refetch();
            if (folder === "inbox") refetchTriage();
          }}
          disabled={isFetching || isTriageLoading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition disabled:opacity-50 cursor-pointer"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          {isFetching || isTriageLoading ? "Prioritizing..." : "Refresh"}
        </button>
      </header>

      {folder === "inbox" && parsedEmails.length > 0 && (
        <div
          className="mx-5 sm:mx-8 mt-5 p-4 rounded-2xl flex items-center justify-between gap-4 border border-emerald-300/[0.12] bg-emerald-300/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]"
          style={{
            background: "rgba(110,231,183,0.04)",
          }}
        >
          <div>
            <p
              className="text-[9px] font-extrabold tracking-widest uppercase font-mono"
              style={{ color: "var(--lime)" }}
            >
              AI Inbox Focus
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              {isTriageLoading
                ? "Reviewing incoming messages…"
                : `${priorityCounts.urgent} urgent · ${priorityCounts.important} important · ${Math.max(triage.length - priorityCounts.urgent - priorityCounts.important, 0)} routine`}
            </p>
          </div>
          <span
            className="text-[9px] font-mono uppercase tracking-widest shrink-0"
            style={{ color: "var(--text-muted)" }}
          >
            {source === "rules"
              ? "Signal fallback"
              : source === "ai"
                ? "AI ranked"
                : "Preparing"}
          </span>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden min-h-0">
        <div
          className="w-1/2 flex flex-col h-full overflow-y-auto bg-white/[0.015]"
          style={{ borderRight: "1px solid var(--border)" }}
        >
          {isFetching && parsedEmails.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <svg
                aria-hidden="true"
                className="animate-spin h-5 w-5"
                style={{ color: "var(--text-secondary)" }}
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          ) : displayedEmails.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <p
                className="text-xs font-bold"
                style={{ color: "var(--text-secondary)" }}
              >
                {meta.emptyLabel}
              </p>
            </div>
          ) : (
            <div style={{ borderBottom: "1px solid var(--border)" }}>
              {displayedEmails.map((email: ParsedGmailMessage) => {
                const isSelected = selectedEmail?.id === email.id;
                const priority = triageById.get(email.id);
                return (
                  <button
                    key={email.id}
                    type="button"
                    onClick={() => setSelectedEmailId(email.id)}
                    className="w-full text-left p-5 flex flex-col gap-2 transition-all duration-150"
                    style={{
                      borderBottom: "1px solid var(--border-muted)",
                      borderLeft: `2px solid ${isSelected ? "var(--lime)" : "transparent"}`,
                      background: isSelected
                        ? "rgba(200,241,53,0.04)"
                        : "transparent",
                    }}
                  >
                    <div className="flex justify-between items-center gap-2">
                      <span
                        className="text-[9px] font-bold tracking-widest uppercase font-mono truncate max-w-[70%]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {email.from}
                      </span>
                      {priority && (
                        <span
                          className="text-[8px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded shrink-0"
                          style={priorityStyles[priority.priority]}
                        >
                          {priority.priority}
                        </span>
                      )}
                      <span
                        className="text-[9px] font-mono shrink-0"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {email.date}
                      </span>
                    </div>
                    <h3
                      className="text-xs font-bold truncate"
                      style={{
                        color: isSelected
                          ? "var(--lime)"
                          : "var(--text-primary)",
                      }}
                    >
                      {email.subject}
                    </h3>
                    <p
                      className="text-[11px] line-clamp-2 leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {email.snippet}
                    </p>
                    {priority && (
                      <p
                        className="text-[10px] leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {priority.summary}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col h-full bg-[#0d0f0e]/70">
          {selectedEmail ? (
            <div className="flex flex-col h-full justify-between">
              <div className="space-y-6">
                <div
                  className="space-y-3 pb-5"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <h2
                      className="text-sm font-bold leading-snug"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {selectedEmail.subject}
                    </h2>
                    <span
                      className="text-[9px] font-mono shrink-0"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {selectedEmail.date}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {[
                      { label: "From", val: selectedEmail.from },
                      { label: "To", val: selectedEmail.to },
                    ].map(({ label, val }) => (
                      <p
                        key={label}
                        className="text-[10px] font-mono"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span
                          className="font-extrabold uppercase tracking-widest mr-2"
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "9px",
                          }}
                        >
                          {label}
                        </span>
                        {val}
                      </p>
                    ))}
                  </div>
                </div>
                <div
                  className="min-h-[160px] p-5 rounded-xl text-xs leading-relaxed whitespace-pre-line"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {selectedEmail.snippet}
                </div>
                {selectedTriage && (
                  <div
                    className="p-4 rounded-xl space-y-2"
                    style={{
                      background: "rgba(200,241,53,0.04)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p
                        className="text-[9px] font-extrabold tracking-widest uppercase font-mono"
                        style={{ color: "var(--lime)" }}
                      >
                        AI Summary
                      </p>
                      <span
                        className="text-[8px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded"
                        style={priorityStyles[selectedTriage.priority]}
                      >
                        {selectedTriage.priority}
                      </span>
                    </div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {selectedTriage.summary}
                    </p>
                    <p
                      className="text-[10px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Why now: {selectedTriage.reason}
                    </p>
                  </div>
                )}
              </div>

              <div
                className="pt-6 flex items-center justify-between gap-4"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <span
                  className="text-[9px] font-mono"
                  style={{ color: "var(--text-muted)" }}
                >
                  ID: {selectedEmail.id}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    deleteEmail(
                      { emailId: selectedEmail.id },
                      { onSuccess: () => setSelectedEmailId(null) },
                    )
                  }
                  disabled={isDeleting}
                  className="px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition disabled:opacity-50"
                  style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#f87171",
                  }}
                >
                  {isDeleting ? "Deleting..." : "Move to Trash"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <p
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Select an email to preview details.
              </p>
            </div>
          )}

          {(fetchError || triageError) && (
            <div
              className="text-xs p-3.5 rounded-xl mt-4"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#f87171",
              }}
            >
              {fetchError instanceof Error
                ? fetchError.message
                : triageError instanceof Error
                  ? triageError.message
                  : "Something went wrong."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
