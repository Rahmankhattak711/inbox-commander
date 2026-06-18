"use client";

import { useMemo, useState } from "react";
import { useGmailDraft } from "@/hooks/useCreateGmailDraft";
import Popup from "./component/Popup";

function decodeHtml(str: string) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export default function GmailPage() {
  const { emails, isFetching, fetchError, refetchEmails } = useGmailDraft();
  const [showCreate, setShowCreate] = useState(false);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  const parsedEmails = useMemo(
    () =>
      emails.map((email: any) => {
        const headers = email.payload?.headers || [];
        const h = (name: string) =>
          headers.find((x: any) => x.name.toLowerCase() === name.toLowerCase())
            ?.value ?? "";

        let dateStr = "";
        const dateHeader = h("date");
        if (dateHeader) {
          dateStr = new Date(dateHeader).toLocaleDateString();
        } else if (email.internalDate) {
          dateStr = new Date(Number(email.internalDate)).toLocaleDateString();
        }

        return {
          id: email.id,
          subject: h("subject") || "(No Subject)",
          to: h("to") || "(No Recipient)",
          from: h("from") || "(No Sender)",
          date: dateStr,
          snippet: email.snippet
            ? decodeHtml(email.snippet)
            : "No preview available",
        };
      }),
    [emails],
  );

  const selectedEmail = useMemo(
    () =>
      parsedEmails.find((e: any) => e.id === selectedEmailId) ||
      parsedEmails[0] ||
      null,
    [parsedEmails, selectedEmailId],
  );

  return (
    <div
      className="flex-1 antialiased flex flex-col h-full animate-in fade-in duration-300"
      style={{ color: "var(--text-primary)", background: "var(--bg-base)" }}
    >
      {/* Top Header */}
      <header
        className="px-8 py-6 flex justify-between items-center shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div>
          <span
            className="text-[9px] font-extrabold tracking-widest uppercase font-mono"
            style={{ color: "var(--lime)" }}
          >
            Gmail Module
          </span>
          <h1
            className="text-2xl font-extrabold tracking-tight mt-1"
            style={{ color: "var(--text-primary)" }}
          >
            Sent Emails
          </h1>
          <p
            className="text-xs mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            View and audit your sent emails.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition cursor-pointer"
            style={{
              background: "var(--lime)",
              color: "var(--bg-base)",
            }}
          >
            Send Email
          </button>
          <button
            onClick={() => refetchEmails()}
            disabled={isFetching}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition disabled:opacity-50 cursor-pointer"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            <svg
              className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              style={{ color: isFetching ? "var(--lime)" : undefined }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            {isFetching ? "Syncing..." : "Refresh"}
          </button>
        </div>
      </header>

      {showCreate && (
        <Popup
          setShowCreate={setShowCreate}
          onClose={() => setShowCreate(false)}
          showCreate={showCreate}
        />
      )}

      {/* Split View */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Email List */}
        <div
          className="w-1/2 flex flex-col h-full overflow-y-auto"
          style={{ borderRight: "1px solid var(--border)" }}
        >
          {isFetching && parsedEmails.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <svg
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
          ) : parsedEmails.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <svg
                className="w-9 h-9 mb-3"
                style={{ color: "var(--text-muted)" }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
              <p
                className="text-xs font-bold"
                style={{ color: "var(--text-secondary)" }}
              >
                No Sent Emails Found
              </p>
            </div>
          ) : (
            <div style={{ borderBottom: "1px solid var(--border)" }}>
              {parsedEmails.map((email: any) => {
                const isSelected = selectedEmail?.id === email.id;
                return (
                  <button
                    key={email.id}
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
                        To: {email.to}
                      </span>
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
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Email Preview */}
        <div
          className="w-1/2 p-8 overflow-y-auto flex flex-col h-full"
          style={{ background: "var(--bg-surface)" }}
        >
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
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <svg
                className="w-9 h-9 mb-3"
                style={{ color: "var(--text-muted)" }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
              <p
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Select an email to preview details.
              </p>
            </div>
          )}
          {fetchError && (
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
                : "Something went wrong."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
