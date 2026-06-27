"use client";

import {
  useDeleteGmailDraft,
  useGmailDrafts,
  useSendGmailDraft,
} from "@/hooks/useCreateGmailDraft";
import { useMemo, useState } from "react";
import DraftPopup from "./DraftPopup";
import { parseGmailMessage } from "./gmail-utils";

export default function GmailDrafts() {
  const { drafts, isFetching, fetchError, refetchDrafts } = useGmailDrafts();
  const { sendDraft, isSending, sendError } = useSendGmailDraft();
  const { deleteDraft, isDeleting, deleteError } = useDeleteGmailDraft();

  const [showCreate, setShowCreate] = useState(false);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);

  const parsedDrafts = useMemo(
    () =>
      drafts.map((draft: Parameters<typeof parseGmailMessage>[0]) =>
        parseGmailMessage(draft),
      ),
    [drafts],
  );

  const selectedDraft = useMemo(
    () =>
      parsedDrafts.find((d: any) => d.id === selectedDraftId) ||
      parsedDrafts[0] ||
      null,
    [parsedDrafts, selectedDraftId],
  );

  const actionError = sendError || deleteError;

  return (
    <div className="flex-1 flex flex-col h-full min-h-0">
      <header
        className="px-8 py-4 flex justify-between items-center shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Manage saved drafts — send or delete when ready.
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition cursor-pointer"
            style={{
              background: "var(--lime)",
              color: "var(--bg-base)",
            }}
          >
            New Draft
          </button>
          <button
            onClick={() => refetchDrafts()}
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
        </div>
      </header>

      {showCreate && (
        <DraftPopup
          setShowCreate={setShowCreate}
          onClose={() => setShowCreate(false)}
        />
      )}

      <div className="flex-1 flex overflow-hidden min-h-0">
        <div
          className="w-1/2 flex flex-col h-full overflow-y-auto"
          style={{ borderRight: "1px solid var(--border)" }}
        >
          {isFetching && parsedDrafts.length === 0 ? (
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
          ) : parsedDrafts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <p
                className="text-xs font-bold"
                style={{ color: "var(--text-secondary)" }}
              >
                No Drafts Found
              </p>
              <button
                onClick={() => setShowCreate(true)}
                className="mt-3 text-[10px] font-bold uppercase tracking-widest"
                style={{ color: "var(--lime)" }}
              >
                Create your first draft
              </button>
            </div>
          ) : (
            <div style={{ borderBottom: "1px solid var(--border)" }}>
              {parsedDrafts.map((draft: any) => {
                const isSelected = selectedDraft?.id === draft.id;
                return (
                  <button
                    key={draft.id}
                    onClick={() => setSelectedDraftId(draft.id)}
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
                        To: {draft.to}
                      </span>
                      <span
                        className="text-[9px] font-mono shrink-0"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {draft.date}
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
                      {draft.subject}
                    </h3>
                    <p
                      className="text-[11px] line-clamp-2 leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {draft.snippet}
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
          {selectedDraft ? (
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
                      {selectedDraft.subject}
                    </h2>
                    <span
                      className="text-[9px] font-mono shrink-0"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {selectedDraft.date}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {[
                      { label: "From", val: selectedDraft.from },
                      { label: "To", val: selectedDraft.to },
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
                  {selectedDraft.snippet}
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
                  Draft ID: {selectedDraft.id}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      deleteDraft(
                        { draftId: selectedDraft.id },
                        {
                          onSuccess: () => setSelectedDraftId(null),
                        },
                      )
                    }
                    disabled={isDeleting || isSending}
                    className="px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition disabled:opacity-50"
                    style={{
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      color: "#f87171",
                    }}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    onClick={() =>
                      sendDraft(
                        { draftId: selectedDraft.id },
                        {
                          onSuccess: () => setSelectedDraftId(null),
                        },
                      )
                    }
                    disabled={isSending || isDeleting}
                    className="px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition disabled:opacity-50"
                    style={{
                      background: "var(--lime)",
                      color: "var(--bg-base)",
                    }}
                  >
                    {isSending ? "Sending..." : "Send Draft"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <p
                className="text-xs font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                Select a draft to preview and send.
              </p>
            </div>
          )}

          {(fetchError || actionError) && (
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
                : actionError instanceof Error
                  ? actionError.message
                  : "Something went wrong."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
