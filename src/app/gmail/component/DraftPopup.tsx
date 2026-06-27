"use client";

import { useGmailDrafts } from "@/hooks/useCreateGmailDraft";
import { useState } from "react";
import { buildRawEmail } from "./gmail-utils";

interface DraftPopupProps {
  onClose: () => void;
  setShowCreate: (show: boolean) => void;
}

export default function DraftPopup({ onClose, setShowCreate }: DraftPopupProps) {
  const { createDraft, isCreatingDraft, createDraftError } = useGmailDrafts();

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const inputClass =
    "w-full rounded-xl px-4 py-3 text-sm outline-none transition";

  const inputStyle = {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  };

  const handleSaveDraft = () => {
    const raw = buildRawEmail({ to, subject, message });

    createDraft(
      { raw },
      {
        onSuccess: () => {
          setShowCreate(false);
          onClose();
          setTo("");
          setSubject("");
          setMessage("");
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 h-screen flex items-center justify-center px-4">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ background: "rgba(8,13,5,0.8)" }}
        onClick={() => {
          setShowCreate(false);
          onClose();
        }}
      />

      <div
        className="relative w-full max-w-md rounded-2xl p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 shadow-2xl"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          boxShadow: "0 0 40px rgba(200,241,53,0.04)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <span
              className="text-[9px] font-extrabold tracking-widest uppercase font-mono"
              style={{ color: "var(--lime)" }}
            >
              New Draft
            </span>
            <h2
              className="text-sm font-bold mt-0.5"
              style={{ color: "var(--text-primary)" }}
            >
              Save Email Draft
            </h2>
            <p
              className="text-[10px] font-mono mt-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Compose and save to Gmail drafts
            </p>
          </div>

          <button
            onClick={() => {
              setShowCreate(false);
              onClose();
            }}
            style={{ color: "var(--text-secondary)" }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveDraft();
          }}
          className="space-y-4"
        >
          <div>
            <label
              className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Recipient
            </label>
            <input
              type="email"
              required
              autoFocus
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="john@example.com"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div>
            <label
              className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Subject
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Project Update"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div>
            <label
              className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Message
            </label>
            <textarea
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your draft..."
              className={`${inputClass} resize-none`}
              style={inputStyle}
            />
          </div>

          {createDraftError && (
            <div
              className="text-xs p-3 rounded-xl"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#f87171",
              }}
            >
              {createDraftError instanceof Error
                ? createDraftError.message
                : "Failed to save draft."}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                setShowCreate(false);
                onClose();
              }}
              className="flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isCreatingDraft}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition active:scale-[0.98] disabled:opacity-50"
              style={{ background: "var(--lime)", color: "var(--bg-base)" }}
            >
              {isCreatingDraft ? "Saving..." : "Save Draft"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
