"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  useDeleteGmailEmail,
  useGmailDraft,
} from "@/hooks/useCreateGmailDraft";
import {
  GMAIL_TAB_META,
  isGmailFolderTab,
  tabFromParam,
} from "@/lib/gmail-folders";
import GmailDrafts from "./component/GmailDrafts";
import GmailFolder from "./component/GmailFolder";
import GmailTrash from "./component/GmailTrash";
import Popup from "./component/Popup";
import { parseGmailMessage } from "./component/gmail-utils";

export default function GmailPage() {
  const searchParams = useSearchParams();
  const tab = tabFromParam(searchParams.get("tab"));
  const meta = GMAIL_TAB_META[tab];
  const { emails, isFetching, fetchError, refetchEmails } = useGmailDraft();
  const { deleteEmail, isDeleting } = useDeleteGmailEmail();
  const [showCreate, setShowCreate] = useState(false);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  const parsedEmails = useMemo(
    () =>
      emails.map((email: Parameters<typeof parseGmailMessage>[0]) =>
        parseGmailMessage(email),
      ),
    [emails],
  );

  const selectedEmail = useMemo(
    () =>
      parsedEmails.find(
        (e: ReturnType<typeof parseGmailMessage>) => e.id === selectedEmailId,
      ) ||
      parsedEmails[0] ||
      null,
    [parsedEmails, selectedEmailId],
  );

  return (
    <div
      className="flex-1 antialiased flex flex-col h-full animate-in fade-in duration-300"
      style={{ color: "var(--text-primary)", background: "var(--bg-base)" }}
    >
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
            {meta.title}
          </h1>
          <p
            className="text-xs mt-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {meta.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {tab === "sent" && (
            <>
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
                {isFetching ? "Syncing..." : "Refresh"}
              </button>
            </>
          )}
        </div>
      </header>

      {showCreate && (
        <Popup
          setShowCreate={setShowCreate}
          onClose={() => setShowCreate(false)}
          showCreate={showCreate}
        />
      )}

      {tab === "drafts" ? (
        <GmailDrafts />
      ) : tab === "trash" ? (
        <GmailTrash />
      ) : isGmailFolderTab(tab) ? (
        <GmailFolder folder={tab} />
      ) : (
        <div className="flex-1 flex overflow-hidden min-h-0">
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
                <p
                  className="text-xs font-bold"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {meta.emptyLabel}
                </p>
              </div>
            ) : (
              <div style={{ borderBottom: "1px solid var(--border)" }}>
                {parsedEmails.map((email: ReturnType<typeof parseGmailMessage>) => {
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
                  <button
                    onClick={() =>
                      deleteEmail(
                        { emailId: selectedEmail.id },
                        {
                          onSuccess: () => setSelectedEmailId(null),
                        },
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
      )}
    </div>
  );
}
